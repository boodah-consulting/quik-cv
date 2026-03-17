<template>
  <div class="row" id="wrapper">
    <div class="col text-h2" id="personal-details">
      <div id="name" class="q-pl-xl">
        <span class="q-pl-xl first-name">{{ firstName }}</span> <span class="last-name">{{ lastName }}</span>
      </div>
    </div>
    <div id="contact-details">
      <div class="justify-center q-my-md q-mr-md">
        <div class="col" id="email"><a :href="'mailto:' + email">{{ email }}</a></div>
        <div class="col" id="phone"><a :href="'tel:' + phone">{{ phone }}</a></div>
      </div>
    </div>
  </div>
  <span class="row justify-center" id="location">{{ location }}</span>
  <div class="row justify-center social-links">
    <a :href="linkedin" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
      <q-icon :name="linkedinIcon" class="social-icon" size="24px" />
    </a>
    <a :href="github" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
      <q-icon :name="githubIcon" class="social-icon" size="24px" />
    </a>
    <a :href="portfolio" target="_blank" rel="noopener noreferrer" class="social-link" title="Portfolio">
      <q-icon :name="globeIcon" class="social-icon" size="24px" />
    </a>
  </div>
</template>

<style scoped>
.social-links {
  margin-top: 0.5rem;
  gap: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--q-primary, currentColor);
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
}

.social-link:hover {
  opacity: 0.8;
  transform: scale(1.1);
  background-color: rgba(var(--q-primary-rgb, 128, 128, 128), 0.1);
}

.social-icon {
  color: currentColor;
}

/* Light/Dark mode compatibility */
.body--light .social-link {
  color: #1976d2;
}

.body--dark .social-link {
  color: #42a5f5;
}

/* Print mode: keep icons visible but hide link URLs */
@media print {
  .social-link {
    text-decoration: none !important;
  }
  
  .social-link::after {
    display: none !important;
    content: none !important;
  }
}
</style>

<script>
import contactDetails from './../data-old/contact_details.json'
import { fabLinkedin, fabGithub, fasGlobe } from '@quasar/extras/fontawesome-v6'

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
    return {
      ...contactDetails,
      linkedinIcon: fabLinkedin,
      githubIcon: fabGithub,
      globeIcon: fasGlobe
    };
  },
  computed: {
    firstName() {
      return this.data?.firstName || this.data?.first_name || contactDetails.firstName
    },
    lastName() {
      return this.data?.lastName || this.data?.last_name || contactDetails.lastName
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
    linkedin() {
      return this.data?.linkedin || contactDetails.linkedin
    },
    github() {
      return this.data?.github || contactDetails.github
    },
    portfolio() {
      return this.data?.portfolio?.link || contactDetails.portfolio?.link
    }
  }
}
</script>
