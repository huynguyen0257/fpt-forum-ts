import {
	// memoize,
	debounce,
} from 'decko';

// class Example {
// 	// @memoize
// 	expensive(key: number) {
// 		let start = Date.now();
// 		while (Date.now()-start < 500) key++;
// 		return key;
// 	}
// }

// let e = new Example();

// // this takes 500ms
// let one = e.expensive(1);
// console.log(`one: ${one}`)

// // this takes 0ms
// let two = e.expensive(2);
// console.log(`two: ${two}`)

// // this takes 500ms
// let three = e.expensive(3);
// console.log(`three: ${three}`)

// let four = e.expensive(1);
// console.log(`four: ${four}`)

class Example {
	@debounce
	foo() {
		return this;
	}
}

const e = new Example();

// this will only call foo() once:
for (let i=1000; i=0; i--) console.log(`e.foo()= ${e.foo()}`);