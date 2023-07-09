<template>
  <v-container>
    <WorkflowHeader title="Sequencing"></WorkflowHeader>
    <div class="text-body-1">
      <p>
        The sequencing pipeline starts with DNA extraction from a specimen. The resulting DNA sample
        is amplified through PCR. Amplified DNA material is sequenced by an external sequencing
        institute, which provides raw sequencing results in the form of chromatograms. A sequence is
        then assembled using one or more chromatograms.
      </p>
      <p>
        At each step of the sequencing workflow, intermediary products are annotated with an
        evaluation of their quality, among other relevant properties.
      </p>
      <p>
        A sequence can be annotated with taxonomic information, either using the reference taxonomy,
        or using a more precise delimitation in Molecular Operational Taxonomic Units (MOTU).
      </p>
    </div>
    <DetailWorkflow :nodes="nodes" :edges="edges" v-bind="$attrs" />
    <GiscusWrapper term="Sequencing"></GiscusWrapper>
  </v-container>
</template>

<script setup lang="ts">
import type { Edge } from '@vue-flow/core'
import type { Node } from '@/components/DetailWorkflow.vue'

import { ref } from 'vue'
import { defaultHandles } from '@/components/MultipleHandleNode.vue'
import DetailWorkflow from '@/components/DetailWorkflow.vue'
import WorkflowHeader from '@/components/WorkflowHeader.vue'
import GiscusWrapper from '@/components/GiscusWrapper.vue'

const nodeDefinitions: Node[] = [
  {
    id: 'specimen',
    type: 'custom',
    label: 'Specimen',
    position: { x: 50, y: 50 },
    data: {
      handles: defaultHandles(['left']),
      target: 'specimen',
      icon: 'fa-locust'
    }
  },
  {
    id: 'DNA',
    type: 'custom',
    label: 'DNA',
    position: { x: 0, y: 230 },
    data: {
      handles: defaultHandles(['top', 'left', 'bot']),
      icon: 'fa-dna',
      items: [
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: { text: 'A unique identifier for the DNA sample' }
        },
        { title: 'Concentration', content: { text: 'DNA sample concentration' } },
        { title: 'Quality', content: { text: 'DNA sample quality' } },
        { title: 'Extraction date' },
        {
          title: 'Extraction method',
          content: {
            text: ['Picked from a configurable list.', 'e.g. chelex, destructive, non destructive']
          }
        },
        { title: 'Extracted by', appendIcon: 'fas fa-users' }
      ]
    }
  },
  {
    id: 'PCR',
    type: 'custom',
    label: 'PCR',
    position: { x: 300, y: 200 },
    data: {
      icon: 'fa-refresh',
      items: [
        { title: 'Number', content: { text: 'A user defined short identifier' } },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier generated as <code>{DNA_code}_{PCR_number}_{forward_primer}_{reverse_primer}</code>'
          }
        },
        { title: 'Date' },
        {
          title: 'Details',
          content: {
            text: 'Additional infos on the PCR, like the number of cycles or the temperature'
          }
        },
        {
          title: 'Target gene',
          content: {
            text: ['Picked from a configurable list of genes.', 'e.g. 16S, COI']
          }
        },
        { title: 'Quality', content: { text: 'PCR quality, e.g. good / failure' } },
        {
          title: 'Specificity',
          content: {
            text: 'A qualifier for the kind of PCR, e.g. gel-cut, reamplification, DNA dilution'
          }
        },
        {
          title: 'Primers',
          content: {
            text: ['Forward and reverse PCR primers.', 'Picked from a list of registered primers.']
          }
        },
        { title: 'Performed by', appendIcon: 'fas fa-users' }
      ],
      handles: defaultHandles(['top', 'bot'])
    }
  },
  {
    id: 'chromato',
    type: 'custom',
    label: 'Chromatogramme',
    position: { x: 550, y: 250 },
    data: {
      icon: 'fa-chart-column',
      items: [
        { title: 'Number', content: { text: 'A user-defined short identifier' } },
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: 'An identifier for the chromatogram, expressed as <code>{Number}|{Primer}</code>'
          }
        },
        {
          title: 'Sequencing institute',
          content: { text: 'The institution responsible for the sequencing' }
        },
        {
          title: 'Quality',
          content: {
            text: [
              'A qualification of the sequence.',
              'This distinguishes between "valid" sequences and other sequences that have undesirable features.',
              'e.g. contaminated or truncated'
            ]
          }
        },
        {
          title: 'Primer',
          content: { text: 'Chromatogram primer picked from a list of registered primers.' }
        }
      ],
      handles: defaultHandles(['top', 'bot'])
    }
  },
  {
    id: 'sequence',
    type: 'custom',
    label: 'Sequence',
    position: { x: 850, y: 200 },
    data: {
      icon: 'fa-chevron-right',
      items: [
        {
          title: 'Code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: [
              'An identifier for the sequence, defined as <code>{specimen_code}_{PCR_code}</code>'
            ]
          }
        },
        {
          title: 'Alignment code',
          appendIcon: 'fas fa-hashtag',
          content: {
            text: [
              'An identifier to be used in alignments, similar to the main sequence code but contains a shortened taxon name.'
            ]
          }
        },
        { title: 'Date', content: { text: 'Assembly date' } },
        {
          title: 'Accession number',
          content: { text: 'In case the sequence was published on the NCBI' }
        },
        { title: 'Status' },
        { title: 'Assembled by', appendIcon: 'fas fa-users' },
        {
          title: 'Published in',
          appendIcon: 'fas fa-newspaper',
          content: { text: 'Optional reference to a Source where the sequence was published.' }
        }
      ],
      handles: defaultHandles(['top', 'bot'])
    }
  },
  {
    id: 'identification',
    type: 'custom',
    label: 'Identification',
    position: { x: 650, y: 700 },
    width: 300,
    data: {
      handles: defaultHandles(['top']),
      target: 'identification',
      icon: 'fa-sitemap'
    }
  },
  {
    id: 'motu',
    type: 'custom',
    label: 'Species Hypotheses',
    position: { x: 1050, y: 700 },
    width: 300,
    data: {
      handles: defaultHandles(['top']),
      target: 'motu',
      icon: 'fa-tags'
    }
  },
  {
    id: 'storage',
    type: 'custom',
    label: 'Storage',
    position: { x: 0, y: 700 },
    width: 270,
    data: {
      handles: defaultHandles(['top']),
      target: 'storage',
      icon: 'fa-boxes'
    }
  }
]

const nodes = ref(nodeDefinitions)

const edges: Edge[] = [
  {
    id: 'specimen-dna',
    source: 'specimen',
    target: 'DNA',
    sourceHandle: 'left',
    targetHandle: 'left',
    animated: true,
    label: 'extraction'
  },
  {
    id: 'dna-pcr',
    source: 'DNA',
    target: 'PCR',
    sourceHandle: 'top',
    targetHandle: 'top',
    animated: true,
    label: 'amplification'
  },
  {
    id: 'pcr-chromato',
    source: 'PCR',
    target: 'chromato',
    sourceHandle: 'bot',
    targetHandle: 'bot',
    animated: true,
    label: 'sequencing'
  },
  {
    id: 'chromato-seq',
    source: 'chromato',
    target: 'sequence',
    sourceHandle: 'top',
    targetHandle: 'top',
    animated: true,
    label: 'processed to'
  },
  {
    id: 'seq-id',
    source: 'sequence',
    target: 'identification',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  },
  {
    id: 'seq-motu',
    source: 'sequence',
    target: 'motu',
    sourceHandle: 'right',
    targetHandle: 'left',
    animated: true
  },
  {
    id: 'seq-storage',
    source: 'DNA',
    target: 'storage',
    sourceHandle: 'bot',
    targetHandle: 'top',
    animated: true
  }
]
</script>
