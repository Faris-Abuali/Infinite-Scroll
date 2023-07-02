# Infinite-Scroll
Infinite Scrolling with React using Refs &amp; IntersectionObserver

Infinite scrolling is incredibly common especially in social media applications, but it is intimidating to setup. 😶 
I followed this video which broke down exactly how to setup infinite scrolling and why it is much easier than it appears. 

📽️ https://youtu.be/NZKUirTtxcg 

Infinite scrolling is really just a fancy type of pagination that will paginate without the user needing to click a button. 👌🏼😎 

This means that we can setup simple pagination, but instead of hooking it up to a button we need to hook it up to scrolling. 
Setting up a JavaScript event on scroll is not very performant, though, ❌😥

So we will be using the amazing InteresectionObserver API ✅ to efficiently check for when the last element of our list is loaded. I.e. when our document's viewport intersects with the last element in our list 


## Intersection Observer API
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

![image](https://github.com/Faris-Abuali/Infinite-Scroll/assets/54215462/6d77e6d5-8218-4e1d-a28a-25cb1507f952)

<br/>
<br/>
<br/>
<br/>


![image](https://github.com/Faris-Abuali/Infinite-Scroll/assets/54215462/026623db-d5a4-4047-b2f3-f855bae255ed)


<br/>
<br/>
<br/>
<br/>

![image](https://github.com/Faris-Abuali/Infinite-Scroll/assets/54215462/fdd3a3a0-388c-4fe3-aaa2-65062396d53b)

