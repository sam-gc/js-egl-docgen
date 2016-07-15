## The Eagle Programming Language
--------------

Eagle is a new programming language designed to be fast, versatile, and elegant.
It takes many of its cues from C. It does not pretend to guarantee memory safety
and it will let you do things that your computer was never meant to do. It is
extremely low-overhead and is thus suitable for embedded systems. The ultimate
goal is for Eagle to be a practical alternative wherever C might be used.

This document will outline the semantics of Eagle, the benefits and drawbacks to
the various features, as well as instructions to both compile the Eagle compiler
from source or install a binary image.

For immediate results, please download the compiler [from Github](https://github.com/samhorlbeck/eagle-lang/releases).
Please note that, currently, only Mac OS X and Linux are supported.

What does Eagle look like? Here is the quintessential "Hello World" program,
as rendered in Eagle:

```
extern func printf(byte* ...) : int

func main(int argc, byte** argv) : int
{
    byte *who = 'World'
    if argc > 1
        who = argv[1]

    printf('Hello, %s!\n', who)
    return 0
}
```

In the subsequent chapters, the Eagle language will be fully explained. This
is an ongoing project and all feedback is more than welcome. Please see the
appendix for information about contributing and submitting issues.

