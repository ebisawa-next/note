<template>
  <div>
    <Header />
    <Success />
    <Error />
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
import Success from '@/components/organisms/nofitications/success'
import Error from '@/components/organisms/nofitications/error'
import Header from "@/components/organisms/common/header"
import Footer from "@/components/organisms/common/footer"

export default {
  components: {
    Header, Footer, Success, Error
  }
};
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  font-size: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul, dl, li, dd, dt {
  list-style: none;
}
a {
  &:hover {
    color: map-get($color-service, color);
  }
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

