### Background and Motivation

I started developing Eagle in the summer of 2015. I was dissatisfied with many
of the modern languages that were being developed to replace C. It was my
opinion then (as it is now) that, while new "systems" languages have made a lot
of contributions to the programming world, they make too many assumptions about
how the programmer *should* write code. The real power of C is that it *is* so
flexible. Safer languages have been around for decades. C remains ubiquitous
for many reasons, one of which is the level of control it gives to the
programmer.

C has been showing its age for quite some time. The syntax is often confusing
and outdated. Language essentials like file inclusion are archaic and
error-prone. The language often requires writing a lot of boilerplate code.
In short, there is a lot of low-hanging fruit when it comes to updating C. My
idea was to create a language that addressed the *obvious* problematic features
of C (i.e. those that get in the way of productivity yet do not provide any
substantial benefit to the programmer). Thus, I created Eagle.

Eagle is giving C a facelift.

I designed the Eagle language and implemented a compiler for it as part of my
honors work at Macalester College. The full (technical) paper documenting the
language and the compiler is under review and should be published sometime in
the foreseeable future.

The Eagle compiler uses the [*LLVM* backend](http://llvm.org) and is primarily
written in C. Parsing is done using *GNU Flex* and *Bison*. The whole system
is highly dependent on the UNIX build system.

