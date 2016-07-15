### Classes

Classes in Eagle are very basic; they do not support inheritance and they have
relatively little classical object-orientation. Their semantics and usage will
be discussed more in a later chapter, but their place in the type system is
important to understand.

Classes are essentially structures with added functionality (see the previous
chapter). Unlike structures, classes can contain methods. These methods can
operate on the data in the given object implicitly.
```
class ArithmeticOp
{
    double a
    double b
    double result

    func sum()
    {
        -- ...
    }

    func sub()
    {
        -- ...
    }
}
```
The layout of the structure of an ArithmeticOp object almost the same as if it were
a `struct`. The items contained (in this case variables `a`, `b`, and `result`)
will be ordered sequentially. It is important to note, however that class member
`a` is not found at the start of the object. There is an implicit pointer at
offset `0` that points to a virtual table for dynamic dispatch (see the next
chapter).

Like Eagle `struct`s and unlike C++ `class`es, the type of a class object is simply
the name; no need to prepend the `class` keyword.

**Important Note**: Class objects are *always* reference counted. The compiler will
throw an error if you try to declare a non-reference counted class object. See the
section about pointers and the chapter about reference counting for more information.

