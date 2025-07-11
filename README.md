# Omnissa Engineering Blog

Welcome to the Omnissa Engineering Blog repository.

This repo stores the https://engineering.omnissa.com site in markdown format and is built with Next.js and Tailwind CSS.
This creates a publicly available site at [https://omnissa-blog.github.io](https://omnissa-blog.github.io). A CNAME record and GitHub Pages configuration points [https://engineering.omnissa.com](https://engineering.omnissa.com) to this site.

### Markdown Editor
Blog content is in [markdown format](https://markdownlivepreview.com/) and can be written & previewed using editors like `Intellij` or free online editors like [StackEdit](https://stackedit.io)

## Publish a blog by creating a PR
This repo is under `euc-public` GitHub enterprise account as [public site is not supported](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) with Enterprise Managed Users (EMUS) on GitHub pages. This means we cannot use the enterprise GitHub login and instead a separate public GitHub Account
is required.
1. Create a public [GitHub Account] (https://github.com/signup) 
2. DM [Parag Kadu on Slack](https://omnissa.enterprise.slack.com/team/U07RH2ASKMK) to get added to this repo as contributor.
3. Clone this repo, create a feature branch, write the blog. 
4. Create a PR against `develop` branch

**Sample PR** -  https://github.com/omnissa-blog/omnissa-blog.github.io/pull/1 

## Getting Started
There are 2 default branches - `develop` & `main`. The content from `main` branch is auto deployed & gets live via workflow action `Deploy Next.js site to Pages`.  
To publish an article or blog there are two options:
1. Create a PR against `develop` branch
2. Directly share the markdown content with the owners/moderators of this repo

### Development And Testing
First, install the dependencies:
```bash
  npm install
```
Then, run the development server:

```bash
  npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code.
- 
## Publish a blog by sharing the markdown content
Alternatively share the content in markdown format to moderators/owners of this repo and we can get it published for you. This is the easiest option as doesn't require setting up the additional GitHub account.

## Adding a new Author
Author info like name, email and avatar image needs to be added for publishing an article.
1. Add author info to [authors.ts](lib/authors.ts) under `authors` section referring to existing entries.
2. Avatar images are stored under [public/assets/images/avatar/](public/assets/images/avatar/)

## Review Process
Once a pull request is opened against the develop branch, people listed in the [CODEOWNERS](.github/CODEOWNERS) file will be notified to review the open PR. Please contact Parag Kadu if you wish to assist with reviewing content before it is published.


