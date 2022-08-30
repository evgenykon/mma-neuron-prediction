<template>
  <Layout>

      <nav class="level">
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Fighters in DB</p>
      <p class="title">0</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Data size</p>
      <p class="title">0</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Predictions</p>
      <p class="title">0</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Success rate</p>
      <p class="title">0</p>
    </div>
  </div>
</nav>

     <section class="hero is-primary py-0 my-0">
        <div class="hero-body p-3">
          <div class="container-fluid">
              Fighters statistic based on data from: 
              <ul>
                <li><a class="tag" href="https://fighters.mixedmartialarts.com/">mixedmartialarts.com</a></li>
                <li><a class="tag" href="https://fightpages.com/">fightpages.com</a></li>
                <li><a class="tag" href="https://ufcstats.com/">ufcstats.com</a></li>
              </ul>
              Neural network based on:
              <ul>
                <li><a href="https://brain.js.org/#/" class="tag">Brain.js</a></li>
              </ul>
          </div>
        </div>
      </section>

      <section class="mt-5">
        <h3 class="title">Latest predictions</h3>


        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile is-parent">
              <!-- article class="tile is-child box">
                <h4 class="subtitle">UFC 278 Usman - Edwards 2</h4>
              </article -->
              collecting data
            </div>
          </div>
        </div>

      </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Index page '
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
