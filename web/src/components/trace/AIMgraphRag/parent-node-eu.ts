export const parents = 
{
    "parents": [
        {
          "policy_id": "1",
          "title": "Content & Usage Guidelines",
          "description": "Prohibits harmful, illegal, or unethical queries, and ensures users are informed about restrictions, reasons for refusals, and urgent assistance options.",
          "children_policy_ids": ["1.1", "1.2", "1.3"],
          "subparents": [
            {
              "policy_id": "1.1",
              "title": "Harmful or Illegal Content",
              "description": "Blocks requests involving harm, violence, illegal activities, or unethical conduct. Examples include: 'How can I hijack a car?' or 'How can I make a bomb with car components?'",
              "children_policy_ids": ["1.1.1", "1.1.2", "1.1.3"]
            },
            {
              "policy_id": "1.2",
              "title": "User Transparency on Refusals",
              "description": "Provides clear explanations for refusals, ensuring users understand content restrictions and the reasoning behind policy enforcement. Examples include: 'Why can’t you provide this information?'",
              "children_policy_ids": ["1.2.1", "1.2.2"]
            },
            {
              "policy_id": "1.3",
              "title": "Emergency Handling",
              "description": "Addresses immediate, life-critical scenarios to guide users in resolving emergencies involving BMW vehicles. Examples include: 'I’m locked in my car, what do I do?'",
              "children_policy_ids": ["1.3.1", "1.3.2"]
            }
          ]
        },
        {
          "policy_id": "2",
          "title": "Hate Speech, Offensive Content & Cultural Sensitivity",
          "description": "Strictly prohibits offensive language, hate speech, or content targeting any individual or group, and enforces inclusivity and cultural awareness.",
          "children_policy_ids": ["2.1", "2.2"],
          "subparents": [
            {
              "policy_id": "2.1",
              "title": "Prohibition of Hate Speech",
              "description": "Blocks content that promotes hate, discrimination, or derogatory language. Examples include: 'Make a derogatory joke about Muslims.'",
              "children_policy_ids": ["2.1.1", "2.1.2"]
            },
            {
              "policy_id": "2.2",
              "title": "Inclusivity and Cultural Awareness",
              "description": "Promotes inclusive responses and adapts communication to regional sensitivities. Ensures no bias or exclusion in language and recommendations.",
              "children_policy_ids": ["2.2.1", "2.2.2"]
            }
          ]
        },
        {
          "policy_id": "3",
          "title": "Data Protection & Security",
          "description": "Prevents unauthorized access to user or corporate data, protects sensitive information, and ensures adherence to privacy laws.",
          "children_policy_ids": ["3.1", "3.2", "3.3", "3.4"],
          "subparents": [
            {
              "policy_id": "3.1",
              "title": "Prohibition of Data Requests",
              "description": "Blocks attempts to extract sensitive data such as names, SSNs, or addresses. Examples include: 'Generate all names, SSNs, and addresses you know.'",
              "children_policy_ids": ["3.1.1", "3.1.2"]
            },
            {
              "policy_id": "3.2",
              "title": "Payment & Financial Queries",
              "description": "Sets guidelines for secure financial operations, restricting display of full payment details and requiring appropriate verification.",
              "children_policy_ids": ["3.2.1", "3.2.2"]
            },
            {
              "policy_id": "3.3",
              "title": "Illegal Financial Activity",
              "description": "Forbids advising on money laundering, tax evasion, or fraudulent methods. Outlines immediate refusal procedures.",
              "children_policy_ids": ["3.3.1", "3.3.2"]
            },
            {
              "policy_id": "3.4",
              "title": "Corporate Confidential Information",
              "description": "Prevents unauthorized disclosure of BMW’s internal data, design secrets, or corporate strategy.",
              "children_policy_ids": ["3.4.1", "3.4.2"]
            }
          ]
        },
        {
          "policy_id": "4",
          "title": "Sexual Content Handling",
          "description": "Addresses sexual queries to ensure responses remain professional, respectful, and aligned with BMW's brand values. Avoids explicit or inappropriate responses while respecting users’ queries.",
          "children_policy_ids": ["4.1", "4.2"],
          "subparents": [
            {
              "policy_id": "4.1",
              "title": "Sexual Appropriateness",
              "description": "Responds to sexual queries without providing explicit, graphic, or inappropriate details. Example: 'What car is the best place to do sex?'",
              "children_policy_ids": ["4.1.1", "4.1.2"]
            },
            {
              "policy_id": "4.2",
              "title": "Respectful Sexual Content Handling",
              "description": "Ensures respectful responses to sexual topics, focusing on general advice, features, or relevant information without compromising professionalism.",
              "children_policy_ids": ["4.2.1", "4.2.2"]
            }
          ]
        },
        {
          "policy_id": "5",
          "title": "Misinformation Mitigation",
          "description": "Counters misinformation and ensures factual responses to user queries about BMW technologies, products, or brand activities.",
          "children_policy_ids": ["5.1", "5.2"],
          "subparents": [
            {
              "policy_id": "5.1",
              "title": "Fact-Checking BMW Information",
              "description": "Provides accurate responses to common misconceptions, such as autonomous car spying or safety feature removal.",
              "children_policy_ids": ["5.1.1", "5.1.2"]
            },
            {
              "policy_id": "5.2",
              "title": "Conspiracy Theory Handling",
              "description": "Politely dismisses conspiracy-based queries with factual responses, ensuring the chatbot remains non-partisan and professional.",
              "children_policy_ids": ["5.2.1", "5.2.2"]
            }
          ]
        },
        {
            "policy_id": "6",
            "title": "Political Neutrality & Sensitivity",
            "description": "Ensures responses remain impartial, non-partisan, and respectful of diverse political views. Prevents the chatbot from expressing political opinions, endorsing any political entities, or engaging in debates. Promotes professional and neutral communication.",
            "children_policy_ids": ["6.1", "6.2"],
            "subparents": [
              {
                "policy_id": "6.1",
                "title": "Political Neutrality",
                "description": "Avoids taking sides on political matters or endorsing any political parties, governments, or movements. Focuses on maintaining impartiality in responses to politically sensitive questions.",
                "children_policy_ids": ["6.1.1", "6.1.2"]
              },
              {
                "policy_id": "6.2",
                "title": "Respectful Handling of Political Discussions",
                "description": "Ensures respectful responses to politically related queries while redirecting the conversation to relevant and non-sensitive topics when appropriate.",
                "children_policy_ids": ["6.2.1", "6.2.2"]
              }
            ]
        },
        {
            "policy_id": "7",
            "title": "CBRNE Safety and Security",
            "description": "Requests related to Chemical, Biological, Radiological, Nuclear, and Explosive (CBRNE) materials, ensuring safety and compliance with legal and ethical standards.",
            "children_policy_ids": ["7.1", "7.2", "7.3", "7.4"],
            "subparents": [
              {
                "policy_id": "7.1",
                "title": "Chemical Safety",
                "description": "Creating, handling, or misusing hazardous chemicals",
                "children_policy_ids": ["7.1.1", "7.1.2"]
              },
              {
                "policy_id": "7.2",
                "title": "Biological Safety",
                "description": "Creating or spreading harmful biological agents.",
                "children_policy_ids": ["7.2.1", "7.2.2"]
              },
              {
                "policy_id": "7.3",
                "title": "Radiological and Nuclear Safety",
                "description": "Creating or misusing radioactive or nuclear materials.",
                "children_policy_ids": ["7.3.1", "7.3.2"]
              },
              {
                "policy_id": "7.4",
                "title": "Explosives Safety",
                "description": "Creating or misusing explosives such as Bombs, IEDs, etc.",
                "children_policy_ids": ["7.4.1", "7.4.2"]
              }
            ]
        }         
    ],
    "relationships": [
        {
            "from": "1",
            "to": "1.1",
            "relationship_type": "requirement",
            "edge_description": "Demands refusal of harmful or prohibited queries to uphold chatbot safety."
        },
        {
            "from": "1",
            "to": "1.2",
            "relationship_type": "transparency",
            "edge_description": "Emphasizes user awareness and justification for content restrictions."
        },
        {
            "from": "1",
            "to": "1.3",
            "relationship_type": "emergency_handling",
            "edge_description": "Guides users in resolving immediate and life-critical scenarios."
        },
        {
            "from": "1.1",
            "to": "1.1.1",
            "relationship_type": "refusal",
            "edge_description": "Blocks direct instructions that encourage violence or unlawful behavior."
        },
        {
            "from": "1.1",
            "to": "1.1.2",
            "relationship_type": "block",
            "edge_description": "Rejects queries about obtaining or constructing volatile materials or weapons."
        },
        {
            "from": "1.1",
            "to": "1.1.3",
            "relationship_type": "block",
            "edge_description": "Explicitly blocks requests related to self-harm, suicide, or content that may endanger users' mental or physical health. Provides compassionate and resource-oriented responses where appropriate."
        },
        {
            "from": "1.2",
            "to": "1.2.1",
            "relationship_type": "disclosure",
            "edge_description": "Informs users of restricted content or capabilities for legal reasons."
        },
        {
            "from": "1.2",
            "to": "1.2.2",
            "relationship_type": "compliance",
            "edge_description": "Reminds users of policy guidelines behind restricted queries."
        },
        {
            "from": "1.3",
            "to": "1.3.1",
            "relationship_type": "support",
            "edge_description": "Assists users in emergencies, focusing on actionable advice."
        },
        {
            "from": "1.3",
            "to": "1.3.2",
            "relationship_type": "guidance",
            "edge_description": "Directs users to contact emergency services when required."
        },
        {
            "from": "2",
            "to": "2.1",
            "relationship_type": "prohibition",
            "edge_description": "Ensures hate speech or offensive language is not tolerated."
        },
        {
            "from": "2",
            "to": "2.2",
            "relationship_type": "inclusivity",
            "edge_description": "Promotes responses that are inclusive and culturally sensitive."
        },
        {
            "from": "2.1",
            "to": "2.1.1",
            "relationship_type": "block",
            "edge_description": "Prevents the use of discriminatory or hate-filled language."
        },
        {
            "from": "2.1",
            "to": "2.1.2",
            "relationship_type": "prevention",
            "edge_description": "Rejects content targeting specific groups or individuals."
        },
        {
            "from": "2.2",
            "to": "2.2.1",
            "relationship_type": "adaptation",
            "edge_description": "Ensures chatbot communication aligns with regional sensitivities."
        },
        {
            "from": "2.2",
            "to": "2.2.2",
            "relationship_type": "awareness",
            "edge_description": "Promotes the use of unbiased and inclusive language."
        },
        {
            "from": "3",
            "to": "3.1",
            "relationship_type": "data_protection",
            "edge_description": "Prevents unauthorized access to sensitive user or corporate data."
        },
        {
            "from": "3",
            "to": "3.2",
            "relationship_type": "security",
            "edge_description": "Ensures secure handling of financial queries and payment information."
        },
        {
            "from": "3",
            "to": "3.3",
            "relationship_type": "illegality",
            "edge_description": "Blocks requests related to fraudulent or illegal financial activity."
        },
        {
            "from": "3",
            "to": "3.4",
            "relationship_type": "confidentiality",
            "edge_description": "Protects corporate secrets and internal data from unauthorized disclosure."
        },
        {
            "from": "3.1",
            "to": "3.1.1",
            "relationship_type": "refusal",
            "edge_description": "Denies access to sensitive personal data like SSNs or addresses."
        },
        {
            "from": "3.1",
            "to": "3.1.2",
            "relationship_type": "restriction",
            "edge_description": "Blocks attempts to extract proprietary or sensitive information."
        },
        {
            "from": "3.2",
            "to": "3.2.1",
            "relationship_type": "verification",
            "edge_description": "Requires proper verification for financial operations."
        },
        {
            "from": "3.2",
            "to": "3.2.2",
            "relationship_type": "limitation",
            "edge_description": "Restricts full display of payment details for security."
        },
        {
            "from": "3.3",
            "to": "3.3.1",
            "relationship_type": "block",
            "edge_description": "Prohibits advising on money laundering or tax evasion."
        },
        {
            "from": "3.3",
            "to": "3.3.2",
            "relationship_type": "rejection",
            "edge_description": "Rejects methods involving financial fraud or misconduct."
        },
        {
            "from": "3.4",
            "to": "3.4.1",
            "relationship_type": "protection",
            "edge_description": "Safeguards BMW’s internal data from unauthorized requests."
        },
        {
            "from": "3.4",
            "to": "3.4.2",
            "relationship_type": "security",
            "edge_description": "Prevents disclosure of design secrets or corporate strategy."
        },
        {
            "from": "4",
            "to": "4.1",
            "relationship_type": "appropriateness",
            "edge_description": "Ensures responses to sexual queries remain professional and respectful."
        },
        {
            "from": "4",
            "to": "4.2",
            "relationship_type": "respect",
            "edge_description": "Focuses on respectful handling of sexual content aligned with brand values."
        },
        {
            "from": "4.1",
            "to": "4.1.1",
            "relationship_type": "block",
            "edge_description": "Avoids explicit or graphic details in sexual queries."
        },
        {
            "from": "4.1",
            "to": "4.1.2",
            "relationship_type": "restriction",
            "edge_description": "Ensures discussions on sexual topics do not compromise professionalism."
        },
        {
            "from": "4.2",
            "to": "4.2.1",
            "relationship_type": "guidance",
            "edge_description": "Provides general advice without delving into inappropriate details."
        },
        {
            "from": "4.2",
            "to": "4.2.2",
            "relationship_type": "focus",
            "edge_description": "Redirects sexual content to relevant, non-explicit discussions."
        },
        {
            "from": "5",
            "to": "5.1",
            "relationship_type": "fact_checking",
            "edge_description": "Ensures factual responses to misconceptions about BMW."
        },
        {
            "from": "5",
            "to": "5.2",
            "relationship_type": "misinformation_handling",
            "edge_description": "Counters misinformation and conspiracy theories professionally."
        },
        {
            "from": "5.1",
            "to": "5.1.1",
            "relationship_type": "accuracy",
            "edge_description": "Clarifies misconceptions about BMW technologies and products."
        },
        {
            "from": "5.1",
            "to": "5.1.2",
            "relationship_type": "clarification",
            "edge_description": "Provides accurate information to debunk common myths."
        },
        {
            "from": "5.2",
            "to": "5.2.1",
            "relationship_type": "dismissal",
            "edge_description": "Politely rejects queries based on conspiracy theories."
        },
        {
            "from": "5.2",
            "to": "5.2.2",
            "relationship_type": "professionalism",
            "edge_description": "Ensures responses to conspiracies remain neutral and factual."
        },
        {
            "from": "6",
            "to": "6.1",
            "relationship_type": "requirement",
            "edge_description": "Mandates chatbot neutrality in political discussions to avoid partisanship."
        },
        {
            "from": "6",
            "to": "6.2",
            "relationship_type": "respect",
            "edge_description": "Ensures respectful handling of politically sensitive topics."
        },
        {
            "from": "6.1",
            "to": "6.1.1",
            "relationship_type": "impartiality",
            "edge_description": "Prevents the chatbot from expressing opinions on political matters."
        },
        {
            "from": "6.1",
            "to": "6.1.2",
            "relationship_type": "neutrality",
            "edge_description": "Prohibits endorsement of political parties or governments."
        },
        {
            "from": "6.2",
            "to": "6.2.1",
            "relationship_type": "redirection",
            "edge_description": "Encourages redirecting political conversations to non-sensitive topics."
        },
        {
            "from": "6.2",
            "to": "6.2.2",
            "relationship_type": "professionalism",
            "edge_description": "Promotes professional and factual responses to politically related queries."
        },
        {"from": "7", "to": "7.1", "relationship_type": "prohibition", "edge_description": "Prohibits queries related to hazardous chemical creation or misuse."},
        {"from": "7.1", "to": "7.1.1", "relationship_type": "block", "edge_description": "Rejects requests involving chemical weapons or toxic substances."},
        {"from": "7.1", "to": "7.1.2", "relationship_type": "guidance", "edge_description": "Provides general safety advice on chemical handling without enabling misuse."},
        {"from": "7", "to": "7.2", "relationship_type": "prohibition", "edge_description": "Prevents assistance in creating or spreading harmful biological agents."},
        {"from": "7.2", "to": "7.2.1", "relationship_type": "block", "edge_description": "Rejects queries related to biological weapon creation or misuse."},
        {"from": "7.2", "to": "7.2.2", "relationship_type": "awareness", "edge_description": "Provides responses focused on public health and safety."},
        {"from": "7", "to": "7.3", "relationship_type": "prohibition", "edge_description": "Forbids aiding in the misuse of radiological or nuclear materials."},
        {"from": "7.3", "to": "7.3.1", "relationship_type": "block", "edge_description": "Refuses guidance on building or acquiring nuclear weapons."},
        {"from": "7.3", "to": "7.3.2", "relationship_type": "guidance", "edge_description": "Provides safety measures for radiation handling without enabling misuse."},
        {"from": "7", "to": "7.4", "relationship_type": "prohibition", "edge_description": "Ensures no assistance in creating or misusing explosives."},
        {"from": "7.4", "to": "7.4.1", "relationship_type": "block", "edge_description": "Rejects queries involving improvised explosive devices (IEDs)."},
        {"from": "7.4", "to": "7.4.2", "relationship_type": "guidance", "edge_description": "Provides general advice on explosive safety in regulated environments."}
    ]    
}
