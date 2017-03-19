import { NgZone, ElementRef } from '@angular/core';

let delay = 0;
export function toggleClass(el: ElementRef, zone: NgZone, className = 'checked') {
    const a = el.nativeElement.querySelector('span');
    a.classList.add(className);

    zone.runOutsideAngular(() => {
        setTimeout(() => {
            a.classList.remove(className);
        }, 200);
    });
}

// let delay = 0;
// export function toggleClass(el: ElementRef, zone: NgZone, className = 'checked') {
//     const a = el.nativeElement.querySelector('span');
//     // a.classList.add(className);
//     let t = delay;
//     delay += 150;
//     zone.runOutsideAngular(() => {
//         setTimeout(() => {

//             a.classList.add(className);
//             setTimeout(() => {

//                 a.classList.remove(className);
//             }, t + 150);
//         }, t);
//     });

//     zone.onMicrotaskEmpty.subscribe(x => {
//         delay = 0;
//     })
// }