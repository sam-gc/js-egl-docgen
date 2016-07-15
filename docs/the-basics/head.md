### The Basics
---

Before we dive into the semantics of the language, it is useful to get a feel for
the language. This chapter will not explain too many of the details, but it will
give you an idea of Eagle's flavor.

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

