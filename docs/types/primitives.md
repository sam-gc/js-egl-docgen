### Primitives

Eagle understands several different primitive types. These are loosely based on
those found in other C-like languages.

#### Integer/Unsigned Integer Types
 * `bool`
 * `byte` / `ubyte`
 * `short` / `ushort`
 * `int` / `uint`
 * `long` / `ulong`

Integers types are directly tied to the corresponding machine type. Unlike C,
however, the sizes of these types are fixed regardless of the architecture.
Consequently, the `byte`, `short`, `int`, and `long` types are represented as
8, 16, 32, and 64 bits respectively. In the future a `sys*` types (i.e.
`sysint`, `syslong`) will be added to control for the different standard sizes
for the given architecture.

Booleans are a single bit (though in practice they are represented as an integer
type that the machine understands).

#### Floating-Point Types
 * `float`
 * `double`

These types correspond directly to their types in C. `float` is 32 bits while
`double` is 64 bits.

#### Void Type
I lied. Unlike most other C-like languages, there
is no (exposed) void type. Wherever you would write `void` in another language,
you would just omit the type. The exception is when you need a pointer that
has an arbitrary type (no type). This is a special case, for which you would
use the `any` type. You would only write `any` in the context of a pointer; it
should not be seen as a replacement for `void`.

#### Function Types
Eagle supports function pointers and pointer closures. These types are somewhat
confusing for people new to C, so it may take some time to get used to the
concept. The type of a function is represented when you create a pointer to a
function. For example, the function
```
func sum(int a, int b) : int { -* ... *- }
```
has the type
```
[int, int : int]*
```

Parameters are listed in the brackets, to the left of the colon. The return type
is to the right. If there are no parameters, then nothing is to the left of the
colon. If there is no return type, then nothing is to the right of the colon.
For example, then, a function taking no parameters and returning nothing would
have the type `[:]*`.

Closures (functions declared in another block) use a similar syntax for type
declarations, but use parentheses instead of brackets. For example, if the
function `sum` above were a closure, the type would be
```
(int, int : int)^
```
and a closure taking no parameters and returning nothing would have the type
`(:)^`.

A key point is that function pointers (i.e. pointers to top-level functions)
will *always* be raw (non-counted) pointers. On the other hand, pointers to
closures will *always* be reference counted. See the relevant chapters for more
information.

Generators have a special type syntax as well, but we need to talk about
generators before going too much into it.

