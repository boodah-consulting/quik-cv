<template>
  <div class="row" id="wrapper">
    <div class="col text-h2" id="personal-details">
      <div id="name">
        <span class="first-name">{{ firstName }}</span> <span class="last-name">{{ lastName }}</span>
      </div>
    </div>
    <div class="col-2 q-my-md q-mr-md" id="contact-details">
      <span class="col" id="email">
        {{ email }}
      </span>
      <div class="col" id="phone">
        {{ phone }}
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import contactDetails from './../data/contact_details.json'

/**
 *
 * Component used to display contact information
 *
 * Usage:
 *   <ContactInformation />
 *
 * @module ContactInformation
 *
 */
export default {
  name: 'ContactInformation',
  data: function() {
    return { ...contactDetails };
  }
}
</script>
