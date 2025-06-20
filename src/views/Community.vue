<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Community & Resources
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Connect with the React and Vue communities, find learning resources, and get help
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Official Resources -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Official Resources</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- React Official -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-3">⚛</span>
              <h3 class="text-xl font-bold text-react-blue">React Official</h3>
            </div>
            <div class="space-y-3">
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Documentation</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Official React documentation and guides</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">GitHub Repository</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Source code and issue tracking</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              <a href="https://react.dev/blog" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Blog</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Official announcements and updates</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Vue Official -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-3">▲</span>
              <h3 class="text-xl font-bold text-vue-green">Vue Official</h3>
            </div>
            <div class="space-y-3">
              <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Documentation</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Official Vue documentation and guides</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              <a href="https://github.com/vuejs/core" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">GitHub Repository</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Source code and issue tracking</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              <a href="https://blog.vuejs.org" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center justify-between p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">Blog</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Official announcements and updates</div>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Community Forums -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Community Forums & Chat</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Discord -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <span class="text-2xl mr-3">💬</span>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Discord</h3>
            </div>
            <div class="space-y-3">
              <a href="https://discord.gg/react" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-react-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-react-blue">React Discord</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Official React community server</div>
              </a>
              <a href="https://discord.com/invite/HBherRA" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-vue-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-vue-green">Vue Discord</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Official Vue community server</div>
              </a>
            </div>
          </div>

          <!-- Reddit -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <span class="text-2xl mr-3">🔗</span>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Reddit</h3>
            </div>
            <div class="space-y-3">
              <a href="https://www.reddit.com/r/reactjs/" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-react-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-react-blue">r/reactjs</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">React subreddit community</div>
              </a>
              <a href="https://www.reddit.com/r/vuejs/" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-vue-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-vue-green">r/vuejs</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Vue subreddit community</div>
              </a>
            </div>
          </div>

          <!-- Stack Overflow -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <span class="text-2xl mr-3">❓</span>
              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Stack Overflow</h3>
            </div>
            <div class="space-y-3">
              <a href="https://stackoverflow.com/questions/tagged/reactjs" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-react-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-react-blue">React Questions</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Q&A tagged with reactjs</div>
              </a>
              <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener noreferrer" 
                 class="block p-3 rounded bg-vue-light dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <div class="font-medium text-vue-green">Vue Questions</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Q&A tagged with vue.js</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Platforms -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Learning Platforms</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Free Resources</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">freeCodeCamp</a>
              </li>
              <li>
                <a href="https://www.codecademy.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Codecademy</a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">YouTube Tutorials</a>
              </li>
              <li>
                <a href="https://dev.to/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">DEV Community</a>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Video Courses</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Udemy</a>
              </li>
              <li>
                <a href="https://frontendmasters.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Frontend Masters</a>
              </li>
              <li>
                <a href="https://egghead.io/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Egghead.io</a>
              </li>
              <li>
                <a href="https://pluralsight.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Pluralsight</a>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interactive Learning</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://scrimba.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Scrimba</a>
              </li>
              <li>
                <a href="https://www.reacttutorial.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">React Tutorial</a>
              </li>
              <li>
                <a href="https://vueschool.io/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Vue School</a>
              </li>
              <li>
                <a href="https://www.vuemastery.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Vue Mastery</a>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Blogs & Articles</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="https://kentcdodds.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Kent C. Dodds (React)</a>
              </li>
              <li>
                <a href="https://antfu.me/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Anthony Fu (Vue)</a>
              </li>
              <li>
                <a href="https://overreacted.io/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">Dan Abramov (React)</a>
              </li>
              <li>
                <a href="https://css-tricks.com/" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 dark:text-blue-400 hover:underline">CSS-Tricks</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tools & Extensions -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Developer Tools & Extensions</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-bold text-react-blue mb-4">React Tools</h3>
            <div class="space-y-3">
              <div class="border-l-4 border-react-blue pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">React Developer Tools</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Browser extension for debugging React</p>
                <div class="mt-2 space-x-2">
                  <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" 
                     target="_blank" rel="noopener noreferrer" 
                     class="inline-block text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                    Chrome
                  </a>
                  <a href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/" 
                     target="_blank" rel="noopener noreferrer" 
                     class="inline-block text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                    Firefox
                  </a>
                </div>
              </div>
              <div class="border-l-4 border-react-blue pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">Create React App</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Official scaffolding tool</p>
                <code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mt-1">
                  npx create-react-app my-app
                </code>
              </div>
              <div class="border-l-4 border-react-blue pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">Vite + React</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Fast modern build tool</p>
                <code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mt-1">
                  npm create vite@latest my-app -- --template react
                </code>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-bold text-vue-green mb-4">Vue Tools</h3>
            <div class="space-y-3">
              <div class="border-l-4 border-vue-green pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">Vue DevTools</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Browser extension for debugging Vue</p>
                <div class="mt-2 space-x-2">
                  <a href="https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd" 
                     target="_blank" rel="noopener noreferrer" 
                     class="inline-block text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                    Chrome
                  </a>
                  <a href="https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/" 
                     target="_blank" rel="noopener noreferrer" 
                     class="inline-block text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                    Firefox
                  </a>
                </div>
              </div>
              <div class="border-l-4 border-vue-green pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">Vue CLI</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Standard tooling for Vue development</p>
                <code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mt-1">
                  npm install -g @vue/cli
                </code>
              </div>
              <div class="border-l-4 border-vue-green pl-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200">Vite + Vue</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Recommended build setup</p>
                <code class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mt-1">
                  npm create vue@latest
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conferences & Events -->
      <div>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Conferences & Events</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-bold text-react-blue mb-4">React Events</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <span class="text-blue-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">React Conf</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">React Summit</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">React Day</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">Local React Meetups</span>
              </li>
            </ul>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-bold text-vue-green mb-4">Vue Events</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <span class="text-green-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">VueConf</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">Vue.js Amsterdam</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">VueDay</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 mr-2">•</span>
                <span class="text-gray-700 dark:text-gray-300">Local Vue Meetups</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component is mostly template-based with external links
</script>