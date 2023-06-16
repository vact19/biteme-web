<template>
  <div class="app">
    <router-link to="/sign-in">
      <h5>로그인하러가라</h5>
    </router-link>
    <h1>Question List</h1>
    <table>
      <tr>
        <th>Status</th>
        <th>Category</th>
        <th>Title</th>
        <th>Posted by</th>
      </tr>

      <tr v-for="post in posts" :key="post.question.id">
        <td>{{ post.question.state }}</td>
        <td>{{ post.question.category }}</td>
        <td @click="goQuestionDetail(post.question.id)">
          {{ post.question.title }}
        </td>
        <td @click="goStudentDetail(post.student.id)">
          {{ post.student.name }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",

  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    // Fetch data from the server
    fetch("https://localhost:8443/questions")
      .then((response) => response.json())
      .then((data) => {
        // Update the posts data with the received response
        this.posts = data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    goQuestionDetail(qid) {
      this.$router.push("/questions/" + qid);
    },
    goStudentDetail(sid) {
      this.$router.push("/students/" + sid);
    },
  },
};
</script>

<style scoped>
div.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid black;
}
a:visited {
  color: rgba(131, 129, 129, 0.98);
}
</style>
