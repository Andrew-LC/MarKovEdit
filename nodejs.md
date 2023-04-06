To create and save a file using Node.js, you can use the built-in fs module which provides file system-related functionality. Here's an example code that creates a file named "example.txt" with some content:

```
To create and save a file using Node.js, you can use the built-in fs module which provides file system-related functionality. Here's an example code that creates a file named "example.txt" with some content:
```

In the above code, we first require the fs module and then define the content of the file as a string variable. Then, we use the writeFile method of the fs module to write the content to a file named "example.txt". The first parameter of the writeFile method is the name of the file to create, and the second parameter is the content to write to the file.

The writeFile method takes a callback function as its third parameter, which is called after the file is created or an error occurs. In this example, we log a message to the console when the file is successfully created. If an error occurs, we throw an exception and log the error message.

Note that the writeFile method will overwrite the file if it already exists. If you want to append content to an existing file, you can use the appendFile method instead.