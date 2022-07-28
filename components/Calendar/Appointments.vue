<script setup lang="ts"></script>

<template>
  <div class="h-1/2 flex flex-col flex-auto overflow-auto">
    <div class="flex flex-auto w-full">
      <div class="w-14 ring-1 ring-gray-100 flex-none bg-white"></div>
      <div class="grid flex-auto grid-cols-1 grid-rows-1">
        <!-- Horizontal lines -->
        <div
          class="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
          style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
        >
          <div class="h-7 row-end-1"></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              12AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              1AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              2AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              3AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              4AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              5AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              6AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              7AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              8AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              9AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              10AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              11AM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              12PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              1PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              2PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              3PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              4PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              5PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              6PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              7PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              8PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              9PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              10PM
            </div>
          </div>
          <div></div>
          <div>
            <div class="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              11PM
            </div>
          </div>
          <div></div>
        </div>

        <!-- Events -->
        <ol
          class="grid grid-cols-1 col-start-1 col-end-2 row-start-1"
          style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
        >
          <li class="relative flex mt-px" style="grid-row: 74 / span 12">
            <a
              href="#"
              class="group inset-1 bg-blue-50 hover:bg-blue-100 absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg"
            >
              <p class="order-1 font-semibold text-blue-700">Breakfast</p>
              <p class="group-hover:text-blue-700 text-blue-500">
                <time datetime="2022-01-22T06:00">6:00 AM</time>
              </p>
            </a>
          </li>
          <li class="relative flex mt-px" style="grid-row: 92 / span 30">
            <a
              href="#"
              class="group inset-1 bg-pink-50 hover:bg-pink-100 absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg"
            >
              <p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
              <p class="group-hover:text-pink-700 order-1 text-pink-500">
                John F. Kennedy International Airport
              </p>
              <p class="group-hover:text-pink-700 text-pink-500">
                <time datetime="2022-01-22T07:30">7:30 AM</time>
              </p>
            </a>
          </li>
          <li class="relative flex mt-px" style="grid-row: 134 / span 18">
            <a
              href="#"
              class="group inset-1 bg-indigo-50 hover:bg-indigo-100 absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg"
            >
              <p class="order-1 font-semibold text-indigo-700">Sightseeing</p>
              <p class="group-hover:text-indigo-700 order-1 text-indigo-500">Eiffel Tower</p>
              <p class="group-hover:text-indigo-700 text-indigo-500">
                <time datetime="2022-01-22T11:00">11:00 AM</time>
              </p>
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
