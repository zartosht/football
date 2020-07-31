'use strict'

const { test, trait } = use('Test/Suite')('Run Matches Test')

trait('Test/ApiClient')
trait('Auth/Client')

test('Make sure every team play once a week', async ({ client }) => {
  for (let week = 1; week < 9; week++) {
    let response = await client.get(`/${week}`).end()

    console.log(`Week: ${week}`)
    if (week < 7) {
      response.assertJSONSubset([
        {
          group: "A",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "B",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "C",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "D",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "E",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "F",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "G",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        },
        {
          group: "H",
          teams: [
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
            {
              plays: week
            },
          ]
        }
      ])
    } else if (week > 6 && week < 9) {
      response.assertJSONSubset({
        firstGroup: [
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          }
        ],
        secondGroup: [
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          },
          {
            plays: week
          }
        ]
      })
    }
  }
})
