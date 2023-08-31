https://cheats.rs/ 


```rust
#[derive (Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

   let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };

dbg!(user2)  // filename.rs user { .. } prints it to the standerd error 
println!("{:?}" , user2)  // or {:#?} for more beauful output 
				  //user {  ... } stdout 

```

```rust 
struct rect { 
w : u32, h : u32, } 

impl rect { 
fn method(&self , args) { } // methods take the self arguemnt 
							// called by . rect.method()
fn function(args) { } // funciotns dont  , called by :: rect::funtions 
}
fn new(w ,  h ) -> self { 
	Self { w, h}
	}
```

The `Self` keywords in the return type and in the body of the function are aliases for the type that appears after the `impl` keyword, which in this case is `Rectangle`.

# enums 

``` rust 
  enum IpAddr {
        V4(u8, u8, u8, u8),
        V6(String),
        none , 
    }

    let home = IpAddr::V4(127, 0, 0, 1);

    let loopback = IpAddr::V6(String::from("::1"));
impl IpAddr { 
	fn method(self){ } // called by : IpAddr::v4(....).method() ;
}

```

`::` is used to determine the variant while `.` is used to call methods 

## Option<> enum 

```rust
let value: Option<&&str> = input.get(num);
println!(
"{:#?}",match value {Some(_) => value.unwrap(),None => "None",})
```

# hashmaps 
hashmaps aren't sort they are messy from the inside like my heart .
the entry method is beatiful :
```rust 
 let mut map = HashMap::new();

    for word in text.split_whitespace() {
	     let count = map.entry(word).or_insert(0); // if the value exisit it return 
						        //refernce to it so you can change it if you want ;
        *count += 1;
    }
```

```rust
    scores.insert(String::from("Blue"), 10);
```
whats amazing that insert replace the exisiting value by the new value 

## for the future :
### [Hashing Functions](file:///home/agent47/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/share/doc/rust/html/book/ch08-03-hash-maps.html#hashing-functions)

By default, `HashMap` uses a hashing function called _SipHash_ that can provide resistance to Denial of Service (DoS) attacks involving hash tables[1](file:///home/agent47/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/share/doc/rust/html/book/ch08-03-hash-maps.html#siphash). This is not the fastest hashing algorithm available, but the trade-off for better security that comes with the drop in performance is worth it. If you profile your code and find that the default hash function is too slow for your purposes, you can switch to another function by specifying a different hasher. A _hasher_ is a type that implements the `BuildHasher` trait. We’ll talk about traits and how to implement them in Chapter 10. You don’t necessarily have to implement your own hasher from scratch; [crates.io](https://crates.io/) has libraries shared by other Rust users that provide hashers implementing many common hashing algorithms.


# Error Handling 
Errors  are on two types recverable and not 
for the first the program could use : Both the Result<t,e> enum and 
option<t> are used for this purpose .

In addtion to panic! macro , expect( ) and unwarp() methods   are use for unrecoverable errors  which simply shouldn't occur.

## Errors Propgating 
this example code explain the concept simply givng the error to another function to handle it or to exit the program with the error code (standerd C way of error codes ) .

```rust

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

`io::Error` enum type can be repalce by `Box<dyn Error>` to handle every error possible .

```rust
fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}
```

The ``~?~ operater is simply a match that define the value to the varable or return the error (whole funtion)

~~~rust 
fn foo() -> Result<(),Box<dyn Error>>{
		let str  = path.to_str()? ; 
		let str = match path.to_str(){
		Ok(value) => value,
		Err(e) => return e ;
		}  ;
}
~~~