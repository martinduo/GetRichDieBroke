/********************************************************************************
* Numpad control by Sebastien Vanryckeghem (http://saezndaree.wordpress.com/)
* Copyright © 2010 Sebastien Vanryckeghem
*
*http://saezndaree.wordpress.com/2008/12/13/numpad-javascript-control/
*
* THIS SOFTWARE IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR 
* IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED 
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
* PURPOSE.

NOTE: See "Developing for the touch keyboard" for key design considerations.
http://msdn.microsoft.com/en-us/library/windows/apps/Hh972345

*-------------------------------------------------------------
http://stackoverflow.com/questions/7610758/prevent-iphone-default-keyboard-when-focusing-an-input

Prevent iphone default keyboard when focusing an <input>:
By setting the input field to readonly="true" you should prevent anyone typing anything in it, but still be able to launch a click event on it.
This is also usefull in non-mobile devices as you use a date/time picker		
Yes, it works.	
Hm! thanks! but will be the datepicker able to set the choosen value? 
Yes it will. Readonly is only for the user, not for JavaScript.
Tested, works. Thanks a lot
********************************************************************************/

// ---------------------------------------------------------------------
// Provides information about an object's coordinates on screen.
// ---------------------------------------------------------------------
var PositionInfo = function (elm)
{
    var p_elm = elm;  

    var Get = function (obj)
    {
        if(typeof(obj) == "object")
        {
            return obj;
        }
        else
        {
            return document.getElementById(obj);
        }
    }

    var Left = function ()
    {
        var x = 0;
        var elm = Get(p_elm);
        while (elm != null)
        {
            x+= elm.offsetLeft;
            elm = elm.offsetParent;
        }
        return parseInt(x);
    }

    var Width = function ()
    {
        var elm = Get(p_elm);
        return parseInt(elm.offsetWidth);
    }

    var Right = function ()
    {
        return Left(p_elm) + Width(p_elm);
    }

    var Top = function ()
    {
        var y = 0;
        var elm = Get(p_elm);
        while (elm != null)
        {
            y+= elm.offsetTop;
            elm = elm.offsetParent;
        }
        return parseInt(y);
    }

    var Height = function ()
    {
        var elm = Get(p_elm);
        return parseInt(elm.offsetHeight);
    }

    var Bottom = function ()
    {
        return Top(p_elm) + Height(p_elm);
    }

    return {
        Top: Top,
        Right: Right,
        Bottom: Bottom,
        Left: Left,
        Width: Width,
        Height: Height
    };
}

// ---------------------------------------------------------------------
// A virtual numpad that can be attached to a text box, and
// allows entering numbers without having to use the keyboard.
// ---------------------------------------------------------------------
var NumpadControl = function (options)
{
    options = options || {};

    // Create the container
    var div = null;  
    var button = null; 
    var target = null;
    var iframe = document.createElement("iframe");
    
    var randomize = options.Randomize === true ? true : false;
    
    // Show the control and position it below the target text box.
    var Show = function (control)
    {
        div.style.display = "block";
        iframe.style.display = "block";        
        target = control;        
        var info = null;
        
        // Move the numpad below the target control.        
        info = new PositionInfo(control);
        div.style.top = info.Bottom() + "px";
        div.style.left = info.Left() + "px";
        
        // Move the IFRAME behind the numpad.
        info = new PositionInfo(div);      
        iframe.style.top = info.Top();
        iframe.style.left = info.Left();
        iframe.style.width = info.Width() + "px";
        iframe.style.height = info.Height() + "px";
    };
    
    // Hide the control    
    var Hide = function ()
    {
        div.style.display = "none";
        iframe.style.display = "none";
    };
    
    // Return a new array from which the item at the selected index has been removed.
    Array.prototype.Remove = function (idx)
    {
        var a1, a2;
        
        a1 = this.slice(0, idx);
        a2 = this.slice(idx + 1, this.length);
        
        return a1.concat(a2);
    };
    
    // Get a numpad button    
    var GetButton = function(value, fn)
    {
        var button = document.createElement("input");
        button.type = "button";
        button.value = value;
        button.style.width = "30px";
        button.style.height = "30px";  
        
        button.onclick = fn;
        
        return button;
    };
    
    // Attach the Numpad control to the page.
    // Create the HTML elements and bind events    
    var Initialize = function ()
    {
        div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = 999999;
        
        if(randomize === true)
        {
            var rem = [0,1,2,3,4,5,6,7,8,9];  
            var idx;
            var pos = 0;
            
            while(pos < 12)
            {
                if(pos != 9 && pos != 11)
                {            
                    idx = Math.floor(Math.random() * (rem.length));                    
                    button = GetButton(rem[idx], (function (value)
                        {
                            return function () { target.value += value; } 
                        })(rem[idx]));                    
                                      
                    div.appendChild(button);                    
                    rem = rem.Remove(idx);
                }
                else
                {
                    if(pos == 9)
                    {
                        button = GetButton("C", function () { target.value = ""; });
                        div.appendChild(button);
                    }
                    
                    if(pos == 11)
                    {
                        button = GetButton("V", function () { Hide(); });
                        div.appendChild(button);
                    }
                }
                
                pos++;
            }
        }
        else
        {
            for(var i=1; i<=9; i++)
            {
                button = GetButton(i, (function (value)
                {
                    return function ()
                    {
                        target.value += value;
                    }          
                })(i));
                
                div.appendChild(button);
            }
            
            // Clear button     
            button = GetButton("C", function ()
            {
                target.value = "";        
            });
            
            div.appendChild(button);
            
            // 0 button   
            button = GetButton(0, (function (value)
            {
                return function () { target.value += value; };        
            })(0));
            
            div.appendChild(button);
            
            // Close button
            button = GetButton("V", function ()
            {
                Hide();
            });
            div.appendChild(button);
        }            
        
        div.style.width = "90px"; 
        iframe.style.position = "absolute";
        iframe.frameBorder = 0;
                
        document.body.appendChild(iframe);
        document.body.appendChild(div);
        
        Hide();
    };
    
    // Call the initialize function to generate the control.    
    Initialize();
    
    // Return the contro object.    
    return {
        Show: Show,
        Hide: Hide
    };
}