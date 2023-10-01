# Felix's Rice Cooker.Com

Hello and welcome to one of my fun side projects, felixsricecooker.com

## The Lore
This all began when I realized I had stopped eating rice and beans, one of my favorite meals. Why am I no longer eating these rice and beans which are so delicious and nutritious for my body? I'll tell you why: because I didn't want to wait 40 minutes when I get home to eat my rice! Under the legacy system in which we once operated, I would come home, measure out my rice, water, and a dab of minced garlic and put it in the cooker and then WAIT 40 minutes (estimated, now that I think about it when I do less rice it doesn't take as long so it might even just be 20 min... is this whole project pointless then? no worries). Who wants to sit around a wait for their food to cook?? No no I want my rice to be ready freddy for my stomaddy. And I think to myself, what a wonderful world, the colors of the rainbow, so pretty in the sky, because holy mackerel I own a raspberry pi just sitting on my shelf and you know what, my roommate generously agreed to bestow upon me a raspi cam... Mmmm the master plan is coming together now. Just like the rice and water in the boiling process...

## The Master Plan
ALAKAZAM! Genius strikes within the hour. A vision forms, at first dim but with growing clarity. A web server, a camera, a cooker, the rice, a raspberry pi... what's missing... Ahh yes. [A Shelley Plus Plug US](https://www.amazon.com/Shelly-Plus-Plug-US-Parent/dp/B0CCTD35LQ). Fully featured with a REST API over HTTP.

Step 1:
- Write a frontend with a video feed of the rice cooker and an on off button.
- Write a backend that can send HTTP GET requests to the Shelley Plus Plug US.
- Hook them bad boys up.
- Profit??

Step 2:
- ?? there is no step 2.

## The Implementation
Not much else to say here. The raspberry pi runs a simple nodejs server with 3 endpoints "/", "/turn-on", and "turn-off". It also runs a mjpg streamer server that the frontend uses. Click the buttons, make an http request, doesn't get easier then that.


