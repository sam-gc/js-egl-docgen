### Classes

Classes in Eagle are very basic; they do not support inheritance and they have
relatively little classical object-orientation. Their semantics and usage will
be discussed more in a later chapter, but their place in the type system is
important to understand.

Classes are essentially structures with added functionality (see the previous
chapter). Unlike structures, classes can contain methods. These methods can
operate on the data in the given object implicitly. For example, let us create
a basic "ArithmeticOp" class:

```
class ArithmeticOp
{
    double a
    double b

    func sum() : double
    {
        return self.a + self.b
    }

    func sub() : double
    {
        return self.a - self.b
    }
}
```

During compilation, the code above will translate to the equivalent code that
uses simple structures:

```
struct ArithmeticOp
{
    double a
    double b
}

func ArithmeticOp_sum(ArithmeticOp^ self) : double
{
    return self.a + self.b
}

func ArithmeticOp_sub(ArithmeticOp^ self) : double
{
    return self.a - self.b
}
```
It is important to note that the functions in the second case take *counted*
pointers to an `ArithmeticOp` structure. Classes are always reference counted.

