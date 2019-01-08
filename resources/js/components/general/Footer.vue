<template>
  <div>
    <div class="container mt-4 footer-container">
      <div class="footer-message">
        This expense tracker is still a work in progress. You can check out its github page
        <a
          href="https://github.com/sloonzz/expense-tracker"
        >here.</a>
      </div>
      <div class="footer-contacts">
        <p>You can contact the creator through these links:</p>
        <small>
          <a href="https://github.com/sloonzz/expense-tracker">github</a>
          <a href="https://www.linkedin.com/in/kendall-rancis-segovia/">linkedin</a>
          <a href="https://sloonzz.github.io/">website/portfolio</a>
          <a href="mailto:kendallrancissegovia@gmail.com">email</a>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
}

.footer-message {
}
.footer-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


