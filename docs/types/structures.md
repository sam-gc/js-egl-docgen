### Structures

Structures will be instantly familiar to anyone versed in C. They represent
named collections of other types.

A structure declaration is very straightforward:

```
struct Person
{
    byte* first_name
    byte* last_name
    short age
    short height
}
```

Semicolons separate the items, but they are not necessary if the items are
enumerated individually on different lines.

When referencing a structure, the name alone is used. For example, the type
of the struct in the example above is `Person`. This is in contrast with C,
where you would need to write `struct Person`. We could thus modify the
example above to be the following:

```
struct Name
{
    byte* first
    byte* last
}

struct Person
{
    Name name
    short age
    short height
}
```

Structures are binary compatible with equivalent C `struct`s, so C library
functions using structures can be called directly from Eagle code.

