<template>
  <div class="stage">
    <div class="actor" />
    <div class="actor" />
    <div class="actor" />
  </div>
</template>

<style lang="scss" scoped>
.stage {
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
}

.actor {
  animation: kenburns 30s linear infinite;
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  inset: 0;
  opacity: 0;
  position: absolute;
  scale: 1.2;
  width: 100vw;
}

.actor:nth-child(1) {
  background-image: url('https://images.unsplash.com/photo-1504221507732-5246c045949b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80');
}
.actor:nth-child(2) {
  animation-delay: 10s;
  background-image: url('https://images.unsplash.com/photo-1595131838595-3154b9f4450b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80');
}
.actor:nth-child(3) {
  animation-delay: 20s;
  background-image: url('https://images.unsplash.com/photo-1618331835717-801e976710b2?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1NjU&ixlib=rb-4.0.3&q=80');
}

@keyframes kenburns {
  25% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
    scale: 1;
  }

  60% {
    opacity: 0;
  }
}
</style>
