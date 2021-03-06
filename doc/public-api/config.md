## Configuration [/api/coi/config]

## Get Latest Configuration [GET]

Requires valid API key.

+ Request

    + Headers

            Authorization: Bearer {authToken}

+ Response 200
    + Headers

            Content-Type:application/json;charset=UTF-8

    + Body

            {
              "colors":{
                "one":"#348FF7",
                "two":"#0E4BB6",
                "three":"#048EAF",
                "four":"#EDF2F2"
              },
              "matrixTypes":[
                {
                  "typeCd":1,
                  "description":"Ownership",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":5,
                      "relationshipCd":1,
                      "description":"Stock",
                      "active":1
                    },
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"Stock Options",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"Other Ownership",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":8,
                      "relationshipCd":1,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":1,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":10,
                      "relationshipCd":1,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":2,
                  "description":"Offices/Positions",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"Partner",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"Board Member",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Other Managerial Positions",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Founder",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":5,
                      "relationshipCd":2,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":3,
                  "description":"Paid Activities",
                  "enabled":1,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[

                  ],
                  "amountOptions":[
                    {
                      "typeCd":11,
                      "relationshipCd":3,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":12,
                      "relationshipCd":3,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":13,
                      "relationshipCd":3,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":14,
                      "relationshipCd":3,
                      "description":"Privately
             Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":15,
                      "relationshipCd":3,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":4,
                  "description":"Intellectual Property",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":8,
                      "relationshipCd":4,
                      "description":"Royalty Income",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":4,
                      "description":"Intellectual
             Property Rights",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":16,
                      "relationshipCd":4,
                      "description":"$1 - $5
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":17,
                      "relationshipCd":4,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":18,
                      "relationshipCd":4,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":19,
                      "relationshipCd":4,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":20,
                      "relationshipCd":4,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":5,
                  "description":"Other",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":10,
                      "relationshipCd":5,
                      "description":"Contract",
                      "active":1
                    },
                    {
                      "typeCd":11,
                      "relationshipCd":5,
                      "description":"Other Transactions",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":21,
                      "relationshipCd":5,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":22,
                      "relationshipCd":5,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":23,
                      "relationshipCd":5,
                      "description":"Over $10
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":24,
                      "relationshipCd":5,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":25,
                      "relationshipCd":5,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":6,
                  "description":"Travel",
                  "enabled":0,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":1,
                  "dateEnabled":1,
                  "reasonEnabled":1,
                  "typeOptions":[

                  ],
                  "amountOptions":[

                  ]
                }
              ],
              "relationshipPersonTypes":[
                {
                  "typeCd":1,
                  "description":"Spouse",
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Self",
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Other",
                  "active":1
                },
                {
                  "typeCd":4,
                  "description":"Entity",
                  "active":1
                }
              ],
              "declarationTypes":[
                {
                  "typeCd":1,
                  "description":"No
             Conflict",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Managed Relationship",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Potential Relationship",
                  "enabled":1,
                  "custom":1,
                  "active":1
                }
              ],
              "disclosureTypes":[
                {
                  "typeCd":1,
                  "description":"Manual Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":2,
                  "description":"Annual Disclosure",
                  "enabled":1
                },
                {
                  "typeCd":3,
                  "description":"Project Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":4,
                  "description":"Travel Log",
                  "enabled":0
                }
              ],
              "notifications":[

              ],
              "questions":{
                "screening":[
                  {
                    "id":1,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"From any privately held organization
            , do you have stock, stock options, or other equity interest of any value?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":2,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"From any for-profit organization, did you receive in the last 12 months, or do you expect
             to receive in the next 12 months, salary, director's fees, consulting payments, honoraria, royalties
            ; or other payments for patents, copyrights or other intellectual property; or other direct payments
             exceeding $5,000?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1
                    }
                  },
                  {
                    "id":3,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Some publicly traded stock must be disclosed
            , but only in specific circumstances. Do you own stock, which in aggregate exceeds $5,000, in a company
             that provides funds to this institution in support of your Institutional Responsibilities (e.g. teaching
            , research, committee, or other administrative responsibilities)? When aggregating, please consider stock
            , stock options, warrants and other existing or contingent ownership interests in the publicly held company
            . Do not consider investments where you do not directly influence investment decisions, such as mutual
             funds and retirement accounts.",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":4,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"From US educational institutions
            , US teaching hospitals or US research institutions affiliated with US educational institutions: Did
             you receive in the last 12 months, or do you expect to receive in the next 12 months, payments for services
            , which in aggregate exceed $5,000 (e.g. payments for consulting, board positions, patents, copyrights
             or other intellectual property)? Exclude payments for scholarly or academic works (i.e. peer-reviewed
             (vs. editorial reviewed) articles or books based on original research or experimentation, published
             by an academic association or a university/academic press).",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  },
                  {
                    "id":5,
                    "active":1,
                    "questionnaireId":1,
                    "parent":2,
                    "question":{
                      "order":1,
                      "text":"If
             Yes, did the organization send you on vacation?",
                      "type":"Text area",
                      "displayCriteria":"Yes",
                      "numberToShow":"1-A"
                    }
                  }
                ],
                "entities":[
                  {
                    "id":6,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"Type:",
                      "type":"Multiselect",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1,
                      "options":[
                        "State Government",
                        "County Government",
                        "Small Business"
                      ],
                      "requiredNumSelections":1
                    }
                  },
                  {
                    "id":7,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"Is this entity public?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":8,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Does this entity sponsor any of your research?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":9,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"Describe the entity's area of business and your relationship to it:",
                      "type":"Text area",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  }
                ]
              },
              "disclosureStatus":[
                {
                  "statusCd":1,
                  "description":"In Progress"
                },
                {
                  "statusCd":2,
                  "description":"Submitted for Approval"
                },
                {
                  "statusCd":3,
                  "description":"Up to Date"
                },
                {
                  "statusCd":4,
                  "description":"Updates Required"
                },
                {
                  "statusCd":5,
                  "description":"Expired"
                },
                {
                  "statusCd":6,
                  "description":"Resubmitted"
                }
              ],
              "projectTypes":[
                {
                  "typeCd":1,
                  "description":"Proposal"
                },
                {
                  "typeCd":2,
                  "description":"Institutional Proposal"
                },
                {
                  "typeCd":3,
                  "description":"IRB Protocol"
                },
                {
                  "typeCd":4,
                  "description":"IACUC Protocol"
                },
                {
                  "typeCd":5,
                  "description":"Award"
                }
              ],
              "general":{
                "peopleEnabled":true,
                "sponsorLookup":true,
                "dueDate":"2015-02-01T06:00:00.000Z",
                "isRollingDueDate":false,
                "instructions":{
                  "Questionnaire":"Questionnaire Instructions",
                  "Financial Entities":"Financial Entities Instructions",
                  "Project Declaration":"Project Declaration Instructions",
                  "Certification":"Certification Instructions"
                },
                "certificationOptions":{
                  "text":"Certification Text",
                  "required":true
                }
              }
            }

## Create New Config [POST]

Requires valid API key with role of admin.  Creates new entry in config table and updates config values in other tables.

+ Request

    + Headers

            Authorization: Bearer {authToken}

    + Body

                {
                  "colors":{
                    "one":"#348FF7",
                    "two":"#0E4BB6",
                    "three":"#048EAF",
                    "four":"#EDF2F2"
                  },
                  "matrixTypes":[
                    {
                      "typeCd":1,
                      "description":"Ownership",
                      "enabled":1,
                      "typeEnabled":1,
                      "amountEnabled":1,
                      "destinationEnabled":0,
                      "dateEnabled":0,
                      "reasonEnabled":0,
                      "typeOptions":[
                        {
                          "typeCd":5,
                          "relationshipCd":1,
                          "description":"Stock",
                          "active":1
                        },
                        {
                          "typeCd":6,
                          "relationshipCd":1,
                          "description":"Stock Options",
                          "active":1
                        },
                        {
                          "typeCd":7,
                          "relationshipCd":1,
                          "description":"Other Ownership",
                          "active":1
                        }
                      ],
                      "amountOptions":[
                        {
                          "typeCd":6,
                          "relationshipCd":1,
                          "description":"$1 - $5,000",
                          "active":1
                        },
                        {
                          "typeCd":7,
                          "relationshipCd":1,
                          "description":"$5,001 - $10,000",
                          "active":1
                        },
                        {
                          "typeCd":8,
                          "relationshipCd":1,
                          "description":"Over $10,000",
                          "active":1
                        },
                        {
                          "typeCd":9,
                          "relationshipCd":1,
                          "description":"Privately Held, no valuation",
                          "active":1
                        },
                        {
                          "typeCd":10,
                          "relationshipCd":1,
                          "description":"Does not apply",
                          "active":1
                        }
                      ]
                    },
                    {
                      "typeCd":2,
                      "description":"Offices/Positions",
                      "enabled":1,
                      "typeEnabled":1,
                      "amountEnabled":1,
                      "destinationEnabled":0,
                      "dateEnabled":0,
                      "reasonEnabled":0,
                      "typeOptions":[
                        {
                          "typeCd":1,
                          "relationshipCd":2,
                          "description":"Partner",
                          "active":1
                        },
                        {
                          "typeCd":2,
                          "relationshipCd":2,
                          "description":"Board Member",
                          "active":1
                        },
                        {
                          "typeCd":3,
                          "relationshipCd":2,
                          "description":"Other Managerial Positions",
                          "active":1
                        },
                        {
                          "typeCd":4,
                          "relationshipCd":2,
                          "description":"Founder",
                          "active":1
                        }
                      ],
                      "amountOptions":[
                        {
                          "typeCd":1,
                          "relationshipCd":2,
                          "description":"$1 - $5,000",
                          "active":1
                        },
                        {
                          "typeCd":2,
                          "relationshipCd":2,
                          "description":"$5,001 - $10,000",
                          "active":1
                        },
                        {
                          "typeCd":3,
                          "relationshipCd":2,
                          "description":"Over $10,000",
                          "active":1
                        },
                        {
                          "typeCd":4,
                          "relationshipCd":2,
                          "description":"Privately Held, no valuation",
                          "active":1
                        },
                        {
                          "typeCd":5,
                          "relationshipCd":2,
                          "description":"Does not apply",
                          "active":1
                        }
                      ]
                    },
                    {
                      "typeCd":3,
                      "description":"Paid Activities",
                      "enabled":1,
                      "typeEnabled":0,
                      "amountEnabled":1,
                      "destinationEnabled":0,
                      "dateEnabled":0,
                      "reasonEnabled":0,
                      "typeOptions":[

                      ],
                      "amountOptions":[
                        {
                          "typeCd":11,
                          "relationshipCd":3,
                          "description":"$1 - $5,000",
                          "active":1
                        },
                        {
                          "typeCd":12,
                          "relationshipCd":3,
                          "description":"$5,001 - $10,000",
                          "active":1
                        },
                        {
                          "typeCd":13,
                          "relationshipCd":3,
                          "description":"Over $10,000",
                          "active":1
                        },
                        {
                          "typeCd":14,
                          "relationshipCd":3,
                          "description":"Privately
                 Held, no valuation",
                          "active":1
                        },
                        {
                          "typeCd":15,
                          "relationshipCd":3,
                          "description":"Does not apply",
                          "active":1
                        }
                      ]
                    },
                    {
                      "typeCd":4,
                      "description":"Intellectual Property",
                      "enabled":1,
                      "typeEnabled":1,
                      "amountEnabled":1,
                      "destinationEnabled":0,
                      "dateEnabled":0,
                      "reasonEnabled":0,
                      "typeOptions":[
                        {
                          "typeCd":8,
                          "relationshipCd":4,
                          "description":"Royalty Income",
                          "active":1
                        },
                        {
                          "typeCd":9,
                          "relationshipCd":4,
                          "description":"Intellectual
                 Property Rights",
                          "active":1
                        }
                      ],
                      "amountOptions":[
                        {
                          "typeCd":16,
                          "relationshipCd":4,
                          "description":"$1 - $5
                ,000",
                          "active":1
                        },
                        {
                          "typeCd":17,
                          "relationshipCd":4,
                          "description":"$5,001 - $10,000",
                          "active":1
                        },
                        {
                          "typeCd":18,
                          "relationshipCd":4,
                          "description":"Over $10,000",
                          "active":1
                        },
                        {
                          "typeCd":19,
                          "relationshipCd":4,
                          "description":"Privately Held, no valuation",
                          "active":1
                        },
                        {
                          "typeCd":20,
                          "relationshipCd":4,
                          "description":"Does not apply",
                          "active":1
                        }
                      ]
                    },
                    {
                      "typeCd":5,
                      "description":"Other",
                      "enabled":1,
                      "typeEnabled":1,
                      "amountEnabled":1,
                      "destinationEnabled":0,
                      "dateEnabled":0,
                      "reasonEnabled":0,
                      "typeOptions":[
                        {
                          "typeCd":10,
                          "relationshipCd":5,
                          "description":"Contract",
                          "active":1
                        },
                        {
                          "typeCd":11,
                          "relationshipCd":5,
                          "description":"Other Transactions",
                          "active":1
                        }
                      ],
                      "amountOptions":[
                        {
                          "typeCd":21,
                          "relationshipCd":5,
                          "description":"$1 - $5,000",
                          "active":1
                        },
                        {
                          "typeCd":22,
                          "relationshipCd":5,
                          "description":"$5,001 - $10,000",
                          "active":1
                        },
                        {
                          "typeCd":23,
                          "relationshipCd":5,
                          "description":"Over $10
                ,000",
                          "active":1
                        },
                        {
                          "typeCd":24,
                          "relationshipCd":5,
                          "description":"Privately Held, no valuation",
                          "active":1
                        },
                        {
                          "typeCd":25,
                          "relationshipCd":5,
                          "description":"Does not apply",
                          "active":1
                        }
                      ]
                    },
                    {
                      "typeCd":6,
                      "description":"Travel",
                      "enabled":0,
                      "typeEnabled":0,
                      "amountEnabled":1,
                      "destinationEnabled":1,
                      "dateEnabled":1,
                      "reasonEnabled":1,
                      "typeOptions":[

                      ],
                      "amountOptions":[

                      ]
                    }
                  ],
                  "relationshipPersonTypes":[
                    {
                      "typeCd":1,
                      "description":"Spouse",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "description":"Self",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "description":"Other",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "description":"Entity",
                      "active":1
                    }
                  ],
                  "declarationTypes":[
                    {
                      "typeCd":1,
                      "description":"No
                 Conflict",
                      "enabled":1,
                      "custom":0,
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "description":"Managed Relationship",
                      "enabled":1,
                      "custom":0,
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "description":"Potential Relationship",
                      "enabled":1,
                      "custom":1,
                      "active":1
                    }
                  ],
                  "disclosureTypes":[
                    {
                      "typeCd":1,
                      "description":"Manual Disclosure",
                      "enabled":0
                    },
                    {
                      "typeCd":2,
                      "description":"Annual Disclosure",
                      "enabled":1
                    },
                    {
                      "typeCd":3,
                      "description":"Project Disclosure",
                      "enabled":0
                    },
                    {
                      "typeCd":4,
                      "description":"Travel Log",
                      "enabled":0
                    }
                  ],
                  "notifications":[

                  ],
                  "questions":{
                    "screening":[
                      {
                        "id":1,
                        "active":1,
                        "questionnaireId":1,
                        "parent":null,
                        "question":{
                          "order":2,
                          "text":"From any privately held organization
                , do you have stock, stock options, or other equity interest of any value?",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":2
                        }
                      },
                      {
                        "id":2,
                        "active":1,
                        "questionnaireId":1,
                        "parent":null,
                        "question":{
                          "order":1,
                          "text":"From any for-profit organization, did you receive in the last 12 months, or do you expect
                 to receive in the next 12 months, salary, director's fees, consulting payments, honoraria, royalties
                ; or other payments for patents, copyrights or other intellectual property; or other direct payments
                 exceeding $5,000?",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":1
                        }
                      },
                      {
                        "id":3,
                        "active":1,
                        "questionnaireId":1,
                        "parent":null,
                        "question":{
                          "order":3,
                          "text":"Some publicly traded stock must be disclosed
                , but only in specific circumstances. Do you own stock, which in aggregate exceeds $5,000, in a company
                 that provides funds to this institution in support of your Institutional Responsibilities (e.g. teaching
                , research, committee, or other administrative responsibilities)? When aggregating, please consider stock
                , stock options, warrants and other existing or contingent ownership interests in the publicly held company
                . Do not consider investments where you do not directly influence investment decisions, such as mutual
                 funds and retirement accounts.",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":3
                        }
                      },
                      {
                        "id":4,
                        "active":1,
                        "questionnaireId":1,
                        "parent":null,
                        "question":{
                          "order":4,
                          "text":"From US educational institutions
                , US teaching hospitals or US research institutions affiliated with US educational institutions: Did
                 you receive in the last 12 months, or do you expect to receive in the next 12 months, payments for services
                , which in aggregate exceed $5,000 (e.g. payments for consulting, board positions, patents, copyrights
                 or other intellectual property)? Exclude payments for scholarly or academic works (i.e. peer-reviewed
                 (vs. editorial reviewed) articles or books based on original research or experimentation, published
                 by an academic association or a university/academic press).",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":4
                        }
                      },
                      {
                        "id":5,
                        "active":1,
                        "questionnaireId":1,
                        "parent":2,
                        "question":{
                          "order":1,
                          "text":"If
                 Yes, did the organization send you on vacation?",
                          "type":"Text area",
                          "displayCriteria":"Yes",
                          "numberToShow":"1-A"
                        }
                      }
                    ],
                    "entities":[
                      {
                        "id":6,
                        "active":1,
                        "questionnaireId":2,
                        "parent":null,
                        "question":{
                          "order":1,
                          "text":"Type:",
                          "type":"Multiselect",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":1,
                          "options":[
                            "State Government",
                            "County Government",
                            "Small Business"
                          ],
                          "requiredNumSelections":1
                        }
                      },
                      {
                        "id":7,
                        "active":1,
                        "questionnaireId":2,
                        "parent":null,
                        "question":{
                          "order":2,
                          "text":"Is this entity public?",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":2
                        }
                      },
                      {
                        "id":8,
                        "active":1,
                        "questionnaireId":2,
                        "parent":null,
                        "question":{
                          "order":3,
                          "text":"Does this entity sponsor any of your research?",
                          "type":"Yes/No",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":3
                        }
                      },
                      {
                        "id":9,
                        "active":1,
                        "questionnaireId":2,
                        "parent":null,
                        "question":{
                          "order":4,
                          "text":"Describe the entity's area of business and your relationship to it:",
                          "type":"Text area",
                          "validations":[
                            "required"
                          ],
                          "numberToShow":4
                        }
                      }
                    ]
                  },
                  "disclosureStatus":[
                    {
                      "statusCd":1,
                      "description":"In Progress"
                    },
                    {
                      "statusCd":2,
                      "description":"Submitted for Approval"
                    },
                    {
                      "statusCd":3,
                      "description":"Up to Date"
                    },
                    {
                      "statusCd":4,
                      "description":"Updates Required"
                    },
                    {
                      "statusCd":5,
                      "description":"Expired"
                    },
                    {
                      "statusCd":6,
                      "description":"Resubmitted"
                    }
                  ],
                  "projectTypes":[
                    {
                      "typeCd":1,
                      "description":"Proposal"
                    },
                    {
                      "typeCd":2,
                      "description":"Institutional Proposal"
                    },
                    {
                      "typeCd":3,
                      "description":"IRB Protocol"
                    },
                    {
                      "typeCd":4,
                      "description":"IACUC Protocol"
                    },
                    {
                      "typeCd":5,
                      "description":"Award"
                    }
                  ],
                  "general":{
                    "peopleEnabled":true,
                    "sponsorLookup":true,
                    "dueDate":"2015-02-01T06:00:00.000Z",
                    "isRollingDueDate":false,
                    "instructions":{
                      "Questionnaire":"Questionnaire Instructions",
                      "Financial Entities":"Financial Entities Instructions",
                      "Project Declaration":"Project Declaration Instructions",
                      "Certification":"Certification Instructions"
                    },
                    "certificationOptions":{
                      "text":"Certification Text",
                      "required":true
                    }
                  }
                }

+ Response 200
    + Headers

            Content-Type:application/json;charset=UTF-8

    + Body

            {
              "colors":{
                "one":"#348FF7",
                "two":"#0E4BB6",
                "three":"#048EAF",
                "four":"#EDF2F2"
              },
              "matrixTypes":[
                {
                  "typeCd":1,
                  "description":"Ownership",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":5,
                      "relationshipCd":1,
                      "description":"Stock",
                      "active":1
                    },
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"Stock Options",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"Other Ownership",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":8,
                      "relationshipCd":1,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":1,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":10,
                      "relationshipCd":1,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":2,
                  "description":"Offices/Positions",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"Partner",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"Board Member",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Other Managerial Positions",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Founder",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":5,
                      "relationshipCd":2,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":3,
                  "description":"Paid Activities",
                  "enabled":1,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[

                  ],
                  "amountOptions":[
                    {
                      "typeCd":11,
                      "relationshipCd":3,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":12,
                      "relationshipCd":3,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":13,
                      "relationshipCd":3,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":14,
                      "relationshipCd":3,
                      "description":"Privately
             Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":15,
                      "relationshipCd":3,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":4,
                  "description":"Intellectual Property",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":8,
                      "relationshipCd":4,
                      "description":"Royalty Income",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":4,
                      "description":"Intellectual
             Property Rights",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":16,
                      "relationshipCd":4,
                      "description":"$1 - $5
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":17,
                      "relationshipCd":4,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":18,
                      "relationshipCd":4,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":19,
                      "relationshipCd":4,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":20,
                      "relationshipCd":4,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":5,
                  "description":"Other",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":10,
                      "relationshipCd":5,
                      "description":"Contract",
                      "active":1
                    },
                    {
                      "typeCd":11,
                      "relationshipCd":5,
                      "description":"Other Transactions",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":21,
                      "relationshipCd":5,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":22,
                      "relationshipCd":5,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":23,
                      "relationshipCd":5,
                      "description":"Over $10
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":24,
                      "relationshipCd":5,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":25,
                      "relationshipCd":5,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":6,
                  "description":"Travel",
                  "enabled":0,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":1,
                  "dateEnabled":1,
                  "reasonEnabled":1,
                  "typeOptions":[

                  ],
                  "amountOptions":[

                  ]
                }
              ],
              "relationshipPersonTypes":[
                {
                  "typeCd":1,
                  "description":"Spouse",
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Self",
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Other",
                  "active":1
                },
                {
                  "typeCd":4,
                  "description":"Entity",
                  "active":1
                }
              ],
              "declarationTypes":[
                {
                  "typeCd":1,
                  "description":"No
             Conflict",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Managed Relationship",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Potential Relationship",
                  "enabled":1,
                  "custom":1,
                  "active":1
                }
              ],
              "disclosureTypes":[
                {
                  "typeCd":1,
                  "description":"Manual Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":2,
                  "description":"Annual Disclosure",
                  "enabled":1
                },
                {
                  "typeCd":3,
                  "description":"Project Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":4,
                  "description":"Travel Log",
                  "enabled":0
                }
              ],
              "notifications":[

              ],
              "questions":{
                "screening":[
                  {
                    "id":1,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"From any privately held organization
            , do you have stock, stock options, or other equity interest of any value?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":2,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"From any for-profit organization, did you receive in the last 12 months, or do you expect
             to receive in the next 12 months, salary, director's fees, consulting payments, honoraria, royalties
            ; or other payments for patents, copyrights or other intellectual property; or other direct payments
             exceeding $5,000?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1
                    }
                  },
                  {
                    "id":3,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Some publicly traded stock must be disclosed
            , but only in specific circumstances. Do you own stock, which in aggregate exceeds $5,000, in a company
             that provides funds to this institution in support of your Institutional Responsibilities (e.g. teaching
            , research, committee, or other administrative responsibilities)? When aggregating, please consider stock
            , stock options, warrants and other existing or contingent ownership interests in the publicly held company
            . Do not consider investments where you do not directly influence investment decisions, such as mutual
             funds and retirement accounts.",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":4,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"From US educational institutions
            , US teaching hospitals or US research institutions affiliated with US educational institutions: Did
             you receive in the last 12 months, or do you expect to receive in the next 12 months, payments for services
            , which in aggregate exceed $5,000 (e.g. payments for consulting, board positions, patents, copyrights
             or other intellectual property)? Exclude payments for scholarly or academic works (i.e. peer-reviewed
             (vs. editorial reviewed) articles or books based on original research or experimentation, published
             by an academic association or a university/academic press).",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  },
                  {
                    "id":5,
                    "active":1,
                    "questionnaireId":1,
                    "parent":2,
                    "question":{
                      "order":1,
                      "text":"If
             Yes, did the organization send you on vacation?",
                      "type":"Text area",
                      "displayCriteria":"Yes",
                      "numberToShow":"1-A"
                    }
                  }
                ],
                "entities":[
                  {
                    "id":6,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"Type:",
                      "type":"Multiselect",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1,
                      "options":[
                        "State Government",
                        "County Government",
                        "Small Business"
                      ],
                      "requiredNumSelections":1
                    }
                  },
                  {
                    "id":7,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"Is this entity public?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":8,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Does this entity sponsor any of your research?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":9,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"Describe the entity's area of business and your relationship to it:",
                      "type":"Text area",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  }
                ]
              },
              "disclosureStatus":[
                {
                  "statusCd":1,
                  "description":"In Progress"
                },
                {
                  "statusCd":2,
                  "description":"Submitted for Approval"
                },
                {
                  "statusCd":3,
                  "description":"Up to Date"
                },
                {
                  "statusCd":4,
                  "description":"Updates Required"
                },
                {
                  "statusCd":5,
                  "description":"Expired"
                },
                {
                  "statusCd":6,
                  "description":"Resubmitted"
                }
              ],
              "projectTypes":[
                {
                  "typeCd":1,
                  "description":"Proposal"
                },
                {
                  "typeCd":2,
                  "description":"Institutional Proposal"
                },
                {
                  "typeCd":3,
                  "description":"IRB Protocol"
                },
                {
                  "typeCd":4,
                  "description":"IACUC Protocol"
                },
                {
                  "typeCd":5,
                  "description":"Award"
                }
              ],
              "general":{
                "peopleEnabled":true,
                "sponsorLookup":true,
                "dueDate":"2015-02-01T06:00:00.000Z",
                "isRollingDueDate":false,
                "instructions":{
                  "Questionnaire":"Questionnaire Instructions",
                  "Financial Entities":"Financial Entities Instructions",
                  "Project Declaration":"Project Declaration Instructions",
                  "Certification":"Certification Instructions"
                },
                "certificationOptions":{
                  "text":"Certification Text",
                  "required":true
                }
              }
            }

# Archived Configuration [/api/coi/config/:id]

## Get Archived Configuration [GET]

Requires valid API key.

+ Parameters
    + id: `1` (number, required) - The Id of the config being retrieved.

+ Request

    + Headers

            Authorization: Bearer {authToken}

+ Response 200
    + Headers

            Content-Type:application/json;charset=UTF-8

    + Body

            {
              "colors":{
                "one":"#348FF7",
                "two":"#0E4BB6",
                "three":"#048EAF",
                "four":"#EDF2F2"
              },
              "matrixTypes":[
                {
                  "typeCd":1,
                  "description":"Ownership",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":5,
                      "relationshipCd":1,
                      "description":"Stock",
                      "active":1
                    },
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"Stock Options",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"Other Ownership",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":6,
                      "relationshipCd":1,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":7,
                      "relationshipCd":1,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":8,
                      "relationshipCd":1,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":1,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":10,
                      "relationshipCd":1,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":2,
                  "description":"Offices/Positions",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"Partner",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"Board Member",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Other Managerial Positions",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Founder",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":1,
                      "relationshipCd":2,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":2,
                      "relationshipCd":2,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":3,
                      "relationshipCd":2,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":4,
                      "relationshipCd":2,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":5,
                      "relationshipCd":2,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":3,
                  "description":"Paid Activities",
                  "enabled":1,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[

                  ],
                  "amountOptions":[
                    {
                      "typeCd":11,
                      "relationshipCd":3,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":12,
                      "relationshipCd":3,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":13,
                      "relationshipCd":3,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":14,
                      "relationshipCd":3,
                      "description":"Privately
             Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":15,
                      "relationshipCd":3,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":4,
                  "description":"Intellectual Property",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":8,
                      "relationshipCd":4,
                      "description":"Royalty Income",
                      "active":1
                    },
                    {
                      "typeCd":9,
                      "relationshipCd":4,
                      "description":"Intellectual
             Property Rights",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":16,
                      "relationshipCd":4,
                      "description":"$1 - $5
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":17,
                      "relationshipCd":4,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":18,
                      "relationshipCd":4,
                      "description":"Over $10,000",
                      "active":1
                    },
                    {
                      "typeCd":19,
                      "relationshipCd":4,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":20,
                      "relationshipCd":4,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":5,
                  "description":"Other",
                  "enabled":1,
                  "typeEnabled":1,
                  "amountEnabled":1,
                  "destinationEnabled":0,
                  "dateEnabled":0,
                  "reasonEnabled":0,
                  "typeOptions":[
                    {
                      "typeCd":10,
                      "relationshipCd":5,
                      "description":"Contract",
                      "active":1
                    },
                    {
                      "typeCd":11,
                      "relationshipCd":5,
                      "description":"Other Transactions",
                      "active":1
                    }
                  ],
                  "amountOptions":[
                    {
                      "typeCd":21,
                      "relationshipCd":5,
                      "description":"$1 - $5,000",
                      "active":1
                    },
                    {
                      "typeCd":22,
                      "relationshipCd":5,
                      "description":"$5,001 - $10,000",
                      "active":1
                    },
                    {
                      "typeCd":23,
                      "relationshipCd":5,
                      "description":"Over $10
            ,000",
                      "active":1
                    },
                    {
                      "typeCd":24,
                      "relationshipCd":5,
                      "description":"Privately Held, no valuation",
                      "active":1
                    },
                    {
                      "typeCd":25,
                      "relationshipCd":5,
                      "description":"Does not apply",
                      "active":1
                    }
                  ]
                },
                {
                  "typeCd":6,
                  "description":"Travel",
                  "enabled":0,
                  "typeEnabled":0,
                  "amountEnabled":1,
                  "destinationEnabled":1,
                  "dateEnabled":1,
                  "reasonEnabled":1,
                  "typeOptions":[

                  ],
                  "amountOptions":[

                  ]
                }
              ],
              "relationshipPersonTypes":[
                {
                  "typeCd":1,
                  "description":"Spouse",
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Self",
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Other",
                  "active":1
                },
                {
                  "typeCd":4,
                  "description":"Entity",
                  "active":1
                }
              ],
              "declarationTypes":[
                {
                  "typeCd":1,
                  "description":"No
             Conflict",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":2,
                  "description":"Managed Relationship",
                  "enabled":1,
                  "custom":0,
                  "active":1
                },
                {
                  "typeCd":3,
                  "description":"Potential Relationship",
                  "enabled":1,
                  "custom":1,
                  "active":1
                }
              ],
              "disclosureTypes":[
                {
                  "typeCd":1,
                  "description":"Manual Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":2,
                  "description":"Annual Disclosure",
                  "enabled":1
                },
                {
                  "typeCd":3,
                  "description":"Project Disclosure",
                  "enabled":0
                },
                {
                  "typeCd":4,
                  "description":"Travel Log",
                  "enabled":0
                }
              ],
              "notifications":[

              ],
              "questions":{
                "screening":[
                  {
                    "id":1,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"From any privately held organization
            , do you have stock, stock options, or other equity interest of any value?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":2,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"From any for-profit organization, did you receive in the last 12 months, or do you expect
             to receive in the next 12 months, salary, director's fees, consulting payments, honoraria, royalties
            ; or other payments for patents, copyrights or other intellectual property; or other direct payments
             exceeding $5,000?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1
                    }
                  },
                  {
                    "id":3,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Some publicly traded stock must be disclosed
            , but only in specific circumstances. Do you own stock, which in aggregate exceeds $5,000, in a company
             that provides funds to this institution in support of your Institutional Responsibilities (e.g. teaching
            , research, committee, or other administrative responsibilities)? When aggregating, please consider stock
            , stock options, warrants and other existing or contingent ownership interests in the publicly held company
            . Do not consider investments where you do not directly influence investment decisions, such as mutual
             funds and retirement accounts.",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":4,
                    "active":1,
                    "questionnaireId":1,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"From US educational institutions
            , US teaching hospitals or US research institutions affiliated with US educational institutions: Did
             you receive in the last 12 months, or do you expect to receive in the next 12 months, payments for services
            , which in aggregate exceed $5,000 (e.g. payments for consulting, board positions, patents, copyrights
             or other intellectual property)? Exclude payments for scholarly or academic works (i.e. peer-reviewed
             (vs. editorial reviewed) articles or books based on original research or experimentation, published
             by an academic association or a university/academic press).",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  },
                  {
                    "id":5,
                    "active":1,
                    "questionnaireId":1,
                    "parent":2,
                    "question":{
                      "order":1,
                      "text":"If
             Yes, did the organization send you on vacation?",
                      "type":"Text area",
                      "displayCriteria":"Yes",
                      "numberToShow":"1-A"
                    }
                  }
                ],
                "entities":[
                  {
                    "id":6,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":1,
                      "text":"Type:",
                      "type":"Multiselect",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":1,
                      "options":[
                        "State Government",
                        "County Government",
                        "Small Business"
                      ],
                      "requiredNumSelections":1
                    }
                  },
                  {
                    "id":7,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":2,
                      "text":"Is this entity public?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":2
                    }
                  },
                  {
                    "id":8,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":3,
                      "text":"Does this entity sponsor any of your research?",
                      "type":"Yes/No",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":3
                    }
                  },
                  {
                    "id":9,
                    "active":1,
                    "questionnaireId":2,
                    "parent":null,
                    "question":{
                      "order":4,
                      "text":"Describe the entity's area of business and your relationship to it:",
                      "type":"Text area",
                      "validations":[
                        "required"
                      ],
                      "numberToShow":4
                    }
                  }
                ]
              },
              "disclosureStatus":[
                {
                  "statusCd":1,
                  "description":"In Progress"
                },
                {
                  "statusCd":2,
                  "description":"Submitted for Approval"
                },
                {
                  "statusCd":3,
                  "description":"Up to Date"
                },
                {
                  "statusCd":4,
                  "description":"Updates Required"
                },
                {
                  "statusCd":5,
                  "description":"Expired"
                },
                {
                  "statusCd":6,
                  "description":"Resubmitted"
                }
              ],
              "projectTypes":[
                {
                  "typeCd":1,
                  "description":"Proposal"
                },
                {
                  "typeCd":2,
                  "description":"Institutional Proposal"
                },
                {
                  "typeCd":3,
                  "description":"IRB Protocol"
                },
                {
                  "typeCd":4,
                  "description":"IACUC Protocol"
                },
                {
                  "typeCd":5,
                  "description":"Award"
                }
              ],
              "general":{
                "peopleEnabled":true,
                "sponsorLookup":true,
                "dueDate":"2015-02-01T06:00:00.000Z",
                "isRollingDueDate":false,
                "instructions":{
                  "Questionnaire":"Questionnaire Instructions",
                  "Financial Entities":"Financial Entities Instructions",
                  "Project Declaration":"Project Declaration Instructions",
                  "Certification":"Certification Instructions"
                },
                "certificationOptions":{
                  "text":"Certification Text",
                  "required":true
                }
              }
            }
