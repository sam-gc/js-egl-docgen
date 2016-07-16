### Functions and Closures

Eagle's functions are the main unit of code in the language. Even in class
definitions, methods are represented as functions. Functions (and their
siblings closures) are relatively simple to understand.

#### Functions

Functions in Eagle are written using the `func` keyword as a declaration.
Every function begins with this keyword. The `func` keyword is followed
by the name, a list of parameters, and (optionally) a return type. For
example, to declare a function taking two integers and returning a long
integer, you would write the following:

```
func do_some_operation(int a, int b) : long
{
    -- ...
}
```

If a function returns a value, it must be declared as in the example above:
a colon followed by the return type. If there is no return type (i.e. void
in another language), you would simply omit both the colon and the return
type:

```
func side_effect_only()
{
    -- ...
}
```

If you declare a return type and not all code paths return a value, the
compiler will halt with an error. In other words, *all functions with a
return type must return a value*.

Top level functions act exactly as the do in C, and are fully binary
compatible with C. The only exception is with structures: unlike C and
C++, Eagle does not support passing or returning structures *by value*.
This is due to the complexities involved with compiler construction and
the various ABIs that exist. In the future Eagle will support passing
structures by value, but for now it is not possible.

##### The `main` function

Eagle's `main` function is the same as it is in C: it can be
simple&mdash;taking no parameters and returning nothing&mdash;or it can take
parameters&mdash;a count of program arguments and an array of those arguments.
It can also return either an integer or nothing.

#### Closures

"Closures" are very useful in Eagle. They represent nested functions that
can operate on data captured from the outside scope. In Eagle, they are
almost as simple and easy to use as those found in Javascript. There are
no "capture lists"&mdash;everything is captured by reference.

The concept of closures can be difficult to understand for someone not
used to them. This section will not attempt to explain how closures are
used generally; rather it will discuss how they are used in Eagle.

Closures are simply written as functions inside of another function.
Additionally, they are not named. Instead, they must be passed directly
or assigned to another variable. For example, let us look at a fully, working
program:

```
func range(int max, (int:)^ callback)
{
    for int i = 0; i < max; i += 1
    {
        callback(i)
    }
}

func main()
{
    int sum = 0
    range(10, func(int i) {
        puts 'In closure'
        sum += i
    })
}
```

In the example above, we see several important concepts. First, we see the
definition of a function `range`, which takes a max value and a closure. The
closure that range accepts must take an integer as its sole parameter and
must not return anything (this is denoted by the `(int:)^` type).

In main, we have a local variable called `sum`. We call range and provide a
closure. In this closure, we print some text and add the value of `i` to sum.
This shows how a closure can modify variables in the surrounding context. At
the end of the `range` call, `sum` will have the value 45.

##### Capture Details

When local variables are captured by closures, they are raised into a
reference-counted regime. This allows captured variables to live beyond the
life of their native scope. For example, we could create a counter factory:

```
func counter(int step) : (:int)^
{
    int internalStore = 0
    return func() : int {
        internalStore += step
        return internalStore
    }
}

func main()
{
    var byOne = counter(1)
    var byTwo = counter(2)

    puts byOne() -- Prints '1'
    puts byOne() -- Prints '2'

    puts byTwo() -- Prints '2'
    puts byTwo() -- Prints '4'
}
```

In this example, the variable `internalStore` is captured by the closure
returned by the `counter` function. Thus, even though `internalStore` has
fallen out of its natural scope when `counter` returns, it is still able
to be used in subsequent calls to the closure objects returned.

**Important Note**: Closures *implicitly* capture variables, so it is not
obvious that a variable has become reference counted. Whenever you capture
a variable&mdash;even if it is not modified&mdash;you are accepting that the
variable will be stored in a `malloc`'d container and will be reference counted.
This detail is crucial because it becomes possible to create reference cycles in
closures, preventing memory from being properly freed. One obvious example is
recursion. If a closure captures itself, it will never be freed because it will
always maintain a reference to itself. To avoid this, use the `recur` keyword:

```
func main()
{
    -- Simple, recursive factorial function
    var factorial = func(long i) : long
    {
        if i == 1
            return i
        return recur(i - 1) * i

        -- WRONG:
        -- return factorial(i - 1) * i
    }

    puts factorial(5) -- Prints '120'
}
```

