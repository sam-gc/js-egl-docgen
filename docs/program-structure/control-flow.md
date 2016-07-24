### Control Flow

Eagle aims to have relatively simple control flow structures. Code should be
easy to read and quick to write.

#### Conditionals

The most basic control flow element is the humble conditional statement. Eagle
uses `if` statements like most other C-like languages to express a conditional
block of code. There is nothing terribly new here, except that parentheses are
not required around the condition (test) itself. For example,

```
var powerLevel = 9001
if powerLevel > 9000
{
    puts 'It\'s over 9000!'
}
```

Alternative conditions can be expressed using subsequent `elif` statements, and
an (optional) final catch-all can be used with `else`. For example, a fully
branched conditional might look like:

```
var count = 100
if count > 100
    puts 'Over'
elif count < 100
    puts 'Under'
else
    puts 'Equal'
```

Note that single-line branches do not need braces. Semantically, however, this
is different from C in that a semicolon is necessary to separate the test from
the following statement. Since Eagle's compiler automatically injects semicolons
where appropriate, you will never need to add a semicolon when the single-statement
branch body is on the subsequent line. On the other hand, if you wish to put the
condition and the branch on the same line, you will need to add the semicolon:

```
var count = 100
if   count > 100; puts 'Over'
elif count < 100; puts 'Under'
else              puts 'Equal' -- ';' not necessary before the 'puts'
```

In these examples we use boolean expressions in the conditional tests. Note,
however, that Eagle uses similar true/false rules as C; `0` is false and most
other values are true. Likewise, all pointers except for `nil` (`0`) render as
true. The semantics of conditional tests are the same for loop tests as well.

#### Loops

There are three types of loops in Eagle: iterative (traditionally a `for` loop
in a C-like language), conditional (traditionally a `while` loop) and
range-based. Unlike most other languages, Eagle only uses one keyword to
indicate a loop: `for`. How the loop acts depends upon the way the loop is
declared.

Due to the semantics of loops, Eagle can not make assumptions about the
expressions contained in the loop statement and body; thus, loop bodies must
always be contained in brackets.

##### Conditional Loops

The most basic kind of loop is the conditional loop&mdash;the body is executed
until some condition is met. For example:

```
for somePollingFunction() > 0
{
    puts 'In the loop'
}
```

Parentheses are not required around the test. The text "In the loop" will be
printed until `somePollingFunction` returns a value &le; 0.

##### Iterative Loops

Iterative loops are also very straightforward; they are simply the traditional
`for` loop. In remaining consistent with Eagle's style, parentheses are not
required for the initialization, test, and update sections of the loop. Those
sections must be separated by a semicolon, unless they are on separate lines.
For example, to (very inefficiently) multiply two numbers, we could create the
following function:

```
func slow_multiply(int x, int y) : int
{
    int accum = 0
    for int i = 0; i < x; i += 1
    {
        accum += y
    }

    return accum
}
```

Two things are important to note about this example. The first is that the
variable `i` is declared
in the setup of the loop (as introduced in the C99 standard) and is not visible
outside of the loop body. The second is that Eagle does not have an
"increment by one" operator&mdash;you must use `+= 1`.

##### Range-Based Loops

Range-based loops are used with generators to iterate over collections or
ranges of data. They consist of two parts: the iterator and the source. The
iterator is just a variable that matches the output type of the generator
function defined by the source. Range-based loops use the `for ... in ...`
syntax. For example, let us look at a generator and a ranged loop:

```
gen range(int max, int step) : int
{
    for int i = 0; i < max; i += step
    {
        yield i
    }
}

func main()
{
    for int i in range(10, 2)
    {
        puts i
    }
}
```

This code would print all of the even numbers between 0 and 8, inclusive.
Obviously this is a contrived example (why use two loops for the task of
one) but it shows how these loops are used in conjunction with generators.
This syntax provides a powerful abstraction when dealing with more complicated
program flows and data structures.

