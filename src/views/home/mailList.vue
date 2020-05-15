<template>
  <div class="mailList">
    <Department pageTitle="通讯录" :isGoBack="false" :occupyBtn="false"></Department>
  </div>
</template>

<script>
import Department from "@components/department/Department";
export default {
  components: { Department }
}
</script>