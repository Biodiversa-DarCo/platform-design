<script setup lang="ts">
import MainWorkflow from '@/components/MainWorkflow.vue'
import { RouterLink } from 'vue-router'

import GiscusWrapper from '@/components/GiscusWrapper.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="text-body-1 mb-3">
          <v-card-item></v-card-item>
          <v-card-text>
            <p class="mb-3">
              This is a simplified representation of the research workflow as it is modelled in the
              current implementation of GOTIT, an ecological data management platform that is used
              at LEHNA to manage the lab research activities on asellids biodiversity. It is not an
              exact specification of a database schema, but is very similar to the actual schema
              that is implemented in GOTIT. Some elements are not presented, such as the
              modelisation of users/persons, or references to the literature, because they are
              implementation details and are not immediately necessary to understand the model.
            </p>

            <p class="mb-3">
              The purpose of this visualisation is to support the design of a data management
              platform for DarCo, and come up with a solution that suits the specific needs of every
              DarCo participants, while being generic enough to enable sharing data across
              laboratories, and focus development efforts on a single common tool.
            </p>

            <p class="mb-3">
              There are two main aspects in this workflow: one is dedicated to modeling the
              generation of "internal" data, sampled and analyzed by the lab; the other allows the
              integration of "external" data from the literature or public databases. Arrows
              represent the direction of data flow, starting from the sampling of specimens in their
              habitat, up to molecular barcoding. Each node represents a main component of the
              research workflow, and hides most of the complexity in the workflow structure to make
              the general model more intelligible. Clicking on a node takes you to a more detailed
              view of its internal components, and their purpose.
            </p>
            <p class="mb-3">
              Please take the time to explore the workflow graph and check whether it matches the
              research practices in your lab.
              <RouterLink :to="{ name: 'sampling' }">Sampling</RouterLink>, as the first step of
              data production, would be a good starting point. Although there are definitely a lot
              of convergent needs that are already covered with the current model, it is not likely
              to be a perfect match for everyone as it is. Besides communicating on the model that
              we propose as a foundation for the web platform, the main purpose of this
              visualisation is to identify as many elements as possible that need to be adapted to
              account for everyone's work practices.
            </p>
            <p>
              As you go through the workflow structure, feel free to comment on which parts are
              unfit to your need, or unclear, as well as features that are missing altogether. A
              <a href="https://github.com/">GitHub</a> account is required to use the comment
              section at the bottom of each page: if this is inconvenient, emails are also perfectly
              fine.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <MainWorkflow
      :zoom-on-scroll="false"
      :pan-on-drag="false"
      :prevent-scrolling="false"
      :nodes-draggable="false"
    />
    <GiscusWrapper term="General workflow"></GiscusWrapper>
  </v-container>
</template>
