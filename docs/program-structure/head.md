## Program Structure
---

Programs in Eagle are structured as they are in C; functions contain code,
files contain functions. The other top-level entities that Eagle supports
include classes, generators, global variables, structure definitions, and
type definitions.

Code in Eagle must be contained in a higher-level block. Eagle is
block-scoped, meaning that variable names are only valid in the scope in
which they are declared (and any sub-scopes). Variables can be overridden
in a child scope; doing so does not modify the other variable with the same
name. This concept is perhaps most clearly explained with an example:
```
-- In some other block...
{
    int a = 45
    
    if yes
    {
        a = 42
        byte* a = 'Text!'
        puts a -- Prints 'Text!'
    }

    puts a -- Prints '42'
}
```

Braces denote a new scoped block, though there are other instances where
a new scope block is created. For example, in a case statement, a new scope
block is created even though braces are not necessary. This is in contrast
with C; you can declare variables in case statements without worrying about
adding braces:

```
var x = 10
var text = 'I am an outer context'
switch x
{
    case 10
        var text = 'I am an inner context'
        puts text -- Prints 'I am an inner context'
}

puts text -- Prints 'I am an outer context'
```

Now that we understand the way blocks work, we can look at functions.
The entry point for all programs is `main` (assuming a standard UNIX system
configuration). Functions will be discussed in greater detail in the next
section. 

