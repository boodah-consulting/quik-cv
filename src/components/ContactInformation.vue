<template>
  <div class="row" id="wrapper">
    <div class="col text-h2" id="personal-details">
      <div id="name" class="q-pl-xl">
        <span class="q-pl-xl first-name">{{ firstName }}</span> <span class="last-name">{{ lastName }}</span>
      </div>
    </div>
    <div id="contact-details">
      <div class="justify-center q-my-md q-mr-md">
        <div class="col" id="email"> {{ email }} </div>
        <div class="col" id="phone"> {{ phone }} </div>
      </div>
    </div>
  </div>
  <span class="row justify-center" id="location">{{ location }}</span>
  <span class="row justify-center" id="github">{{ github }} </span>
</template>

<style></style>

<script>
import contactDetails from './../data-old/contact_details.json'

export default {
  name: 'ContactInformation',
  props: {
    data: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: function () {
    return { ...contactDetails };
  },
  computed: {
    firstName() {
      return this.data?.first_name || contactDetails.first_name
    },
    lastName() {
      return this.data?.last_name || contactDetails.last_name
    },
    email() {
      return this.data?.email || contactDetails.email
    },
    phone() {
      return this.data?.phone || contactDetails.phone
    },
    location() {
      return this.data?.location || contactDetails.location
    },
    github() {
      return this.data?.github || contactDetails.github
    }
  }
}
</script>
