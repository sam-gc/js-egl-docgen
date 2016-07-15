### Typedef's

Eagle allows you to alias any type (simple or complex) to another identifier.
For example, you could write:
```
typedef int* int_ptr
```

The code above would create a new type, `int_ptr`, that is aliased to a pointer
to an integer. The type `int_ptr` can now be used transparently wherever you
would use `int*`. For example, we could declare a (very broken, useless) function
called `get_invalid_ptr`:
```
func get_invalid_ptr(int i) : int_ptr
{
    return &i
}
```

This works because, while the type of the expresson "`&i`" is `int*`, we have
aliased `int*` to `int_ptr`.

There are no restrictions on type definitions, and you can export/import them as
you would any other top-level code item. The aliased type can be arbitrarily
complex. The only rule is that the type is followed by a valid identifier, which
is converted into a type by the compiler. Because of Eagle's simplified function
pointer syntax, typedefs will *always* follow the same syntax, even for very
complex types. For example, the following C code declares a typedef for a function
pointer.

In C, you would write:
```c
typedef int *(*alloc_int_func)(int);
```

whereas in Eagle this would be declared as:
```
typedef [int : int*]* alloc_int_func
```

Clearly the intent is much simpler in the latter. The type and the aliased name
are clearly distinguished, and the function pointer type syntax clearly denotes
a function that takes an int as a parameter and returns a pointer to an int.

