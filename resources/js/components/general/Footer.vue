<template>
  <div>
    <div class="container footer-container">
      <div class="footer-message">
        <small>
          This expense tracker is still a work in progress. You can check out its github page
          <a
            href="https://github.com/sloonzz/expense-tracker"
          >here.</a>
        </small>
      </div>
      <div class="footer-contacts">
        <small>
          <p>You can contact the creator through these links:</p>
        </small>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer-contacts {
  padding: 12px 10px;
  font-size: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>


