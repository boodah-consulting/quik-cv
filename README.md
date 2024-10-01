# QuikCV

<img src="src/assets/logo.png" alt="QuikCV">

## Adding entries

### Contact

You will need to add entries to the `src/data/contact_details.json` file. The entries
are objects with the following properties:

```json
{
  "firstName": "Joe",
  "lastName": "Bloggs",
  "email": "y@me.com",
  "phone": "555 5555 555"
}
```

### Captions

You will need to add entries to the `src/data/captions.yaml` file. The entries
are objects with the following properties:

```yaml
---
heading: |
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

### Jobs

You will need to add entries to the `src/data/jobs.yaml` file. The entries
are objects with the following properties:


```yaml
---
-
  company: n-vyro.io
  position: Founder/Creator
  start_date: Mar 19
  end_date: Present
  description: |
    Utilised electronics skills to build prototypes in C/C++, Ruby, and
    ECMAScript. Developed a release pipeline for 14+ repositories, enabling
    rapid project progression and targeted feature releases based on project
    milestones.
```

### Projects

You will need to add entries to the `src/data/projects.yaml` file. The entries
are objects with the following properties:

```yaml
---
- name: n-vyro.io
  description: |
    This has been one of my most challenging projects to date,
    as it touches on most, if not all, of my existing knowledge.
    It has also allowed me to be focus on areas that I've felt I
    needed to spend more time on. Like release management, and
    component drive development.
  url: https://n-vyro.io
- name: QuikCV
  description: |
    Originally, this was online but after failing to find a
    viable way of monetising the project, I've kept it as my
    personal tool, which I still use to this day.

    I still maintain the project, as it's a great way to keep my
    skills up to date.
  url: https://github.com/boodah-consulting/quik-cv
```

### Skills

You will need to add entries to the `src/data/skills.yaml` file. The entries
are objects with the following properties:

```yaml
---
- API design/development
- Agile
- Architecture
- BDD
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
