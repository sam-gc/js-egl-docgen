## The Basics
---

Before we dive into the semantics of the language, it is useful to get a feel for
the language. This chapter will not explain too many of the details, but it will
give you an idea of Eagle's flavor.

All of the sections in this chapter have been kept on this one page, so that this
page may serve as a reference during development. Once you have the hang of the
language, it may be useful to double check your syntax without having to read the
nitty-gritty details.

#### Functions

First things first: the basic program structure:
```
-- I am a comment
-* I am
     also
     a
     comment *-

func main() -- Function returns nothing
{
    puts iAmAFunction(42) -- Function call before declaration
}

func iAmAFunction(int iAmAParameter) : int
{
    var iAmAVariable = 100 -- `var` uses type-inference
    return iAmAVariable + iAmAParameter
}
```

The example above demonstrates a few of the key features of Eagle. Functions can
be declared in any order; there is no need to have predeclarations as in C. When
a function does not return anything, the return type is omitted entirely. There
is simple (i.e. boilerplate-reducing) type inference for local variables. And as
good systems programmers often debug via raw value printing, there is a dedicated
`puts` statement.

Notice that there are no semicolons at the end of statements. Eagle is clever
(though really the compiler does the heavy lifting); while formally the language
requires semicolons to terminate statements, the programmer need not do this in
most cases as newlines are auto-injected at line breaks where it makes sense.

#### Control Flow

Control flow is simplified in Eagle. If/elif/else branches are written as follows:
```
int magicNumber = 42

if magicNumber == 42
    puts 'Well this is what we expected.'
elif magicNumber > 42 || magicNumber < 42
{
    puts 'A cosmic ray must have flipped a bit'
    exit(0)
}
else
    puts 'A cosmic ray must have flipped an instruction...'
```

Like C, Eagle supports single-line if bodies. Unlike C, the programmer is not required
to put parentheses around the test for the if statements. The same is true for loops:

```
for int i = 0; i < magicNumber; i += 1
{
    puts i
}
```

It is important to note that loop bodies *always* have brackets surrounding them.
Because we have multiple statements on one line, we must use semicolons. Like Go,
Eagle has only one loop keyword: `for`. If a single statement is included after
the `for` keyword, the loop acts as a traditional `while` loop.

Switch statements provide a simple way to deal with enumerated values, though they
differ from conventional C switch statements in several ways. Below is an example
of an Eagle switch statement:
```
switch magicNumber
{
    case 42
        puts 'Yep, this is the right number'
    case 1
        fallthrough
    case 2
        fallthrough
    default
        puts 'Well something is broken.'
        puts 'You probably did not need those fallthroughs'
}
```

In Eagle code, a switch case explicitly needs to be told to fallthrough; a break is
implicit. Please see the chapter about control flow for more information about the
semantics of these statements.

#### Variables

Variables in Eagle are declared much as they are in C. Unlike many of the new "systems"
languages (*get off my lawn*), Eagle defines variables using the syntax `type var_name`.
For example,
```
int i
int j = 5
```
declares an uninitialized (*yikes*) variable `i`, and an initialized variable `j`.

Valid variable names can include any letter in the alphabet (lower or upper case), numbers
(except for the first position), and underscores. No other characters are allowed in
variable names. Variable names can be arbitrarily long, but as the compiler currently
does not check on these things and may overflow in certain cases, it is best not to have
variables that have 10,000-character long names.

#### Literals

Object and value literals are essential to clean, elegant code. There are of
course the simple literals (numbers, strings, characters, and booleans):

```
10, 0x45, 100lf, 0.2 -- Numbers
'I am a string', 'B' -- Strings
`b`, `\n`            -- Characters
yes, no              -- Booleans
```

There is also the sad, misunderstood, but widely exploited literal:
```
nil -- I've never had a billion dollars in my life
```

Structures (discussed later) also can be declared using literals, much as they
are in C. Supposing we had a `Point` struct containing fields `x` and `y`,
```
var p = Point {
    .x = 640
    .y = 480
}
```

would create a `Point` object `p` with values 640 and 480 for `x` and `y`, respectively.

#### Pointers<sup style="color: #999; font-size: 8pt">AAAAaaaaaahhhh</sup>

There are two types of pointers in Eagle: counted and uncounted. Uncounted
pointer behave much like their C counterparts. They can reference any address
in memory (even invalid ones!) and provide no management features. Counted
pointers, on the other hand, are tracked by the compiler, which injects
reference-counting code into your program in order to automatically free
dynamically-allocated memory as soon as it is no longer in use.

Pointers decorate *types*, not *variables* (the opposite is true in C).
If we wanted to create a pointer to a variable in memory, we could do
the following:
```
int* ptrX = malloc(sizeof(int))
free(ptrx)
```

The asterisk denotes a *raw* (C) pointer type. Thus, `ptrX` has type `int*`. 
If we wanted to create automatically counted memory, we could declare a
variable as follows:
```
int^ ptrY = new int
```
Note that in this case, it is unnecessary (and illegal!) to `free` the memory
pointed to by `ptryY`. This is because `ptrY` is *counted* with type `int^`.
When the reference count of that memory allocated using the `new` keyword
falls to zero, the memory will be automagically freed.

Dereferencing a pointer in Eagle is different than most other C-like languages.
Unlike C, the dereference operator is post-script. It applies to both counted
and uncounted pointer types and is represented by an exclamation point. For example,
```
ptrX! = ptrY! = 42
puts ptrX! == ptrY! -- Prints '(bool) 1'
```
will first assign the value 42 to the memory pointed to by both `ptrX` and `ptrY`,
and will then print whether or not they are equal.

Pointers are a complicated subject to begin with, and there are lots of subtleties
where Eagle is concerned. The chapter on pointers and reference counting will go
into much more detail.

#### Imports and Exports

For many projects, multiple code files are required to keep the engineers sane.
Splitting code among several files is good practice, but can be a burden in C
and its brethren. Eagle does not require the creation of separate header and
implementation files; rather, the compiler will generate header definitions on
the fly when it sees that a file has been imported. Eagle makes it simple to
link files together.

For example:
```
-* File "./main.egl" *-

import 'lib.egl'

func main(int argc, byte** argv)
{
    puts sum(atoi(argv[1], 10))
}
```
```
-* File "./lib.egl" *-

export '*'

extern func atoi(byte*) : int

func sum(int a, int b)
{
    return a + b
}
```

The main function in the first file references another file called `lib.egl`.
This file contains some function definitions (one external, one defined as
code) and exports all of them. As such, the `main.egl` file has access to
both symbols `atoi` and `sum`. As we will see in a later chapter, the
export system is quite powerful at allowing/disallowing different symbols to
reach global scope.

There are many more semantic goodies that will be explained later. For now though
we have established a basic understanding of what Eagle looks like and how it works.
The subsequent chapters will begin to go more in depth into these issues.

