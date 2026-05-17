import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Before Appointing a Physiotherapist — Read This First",
    category: "Patient Awareness",
    description:
      "Awareness can protect recovery. Learn what families should verify before starting physiotherapy treatment.",
    sections: [
      {
        heading: "Awareness Can Protect Recovery",
        paragraphs: [
          "At Movement Rehab, we often see families starting physiotherapy treatment without properly verifying qualification, registration, clinical experience, or treatment approach.",
          "Many patients realize the importance of these factors only after weeks or months when expected rehabilitation outcomes are not achieved. This situation is becoming increasingly common, especially in home care rehabilitation services.",
          "Physiotherapy is a healthcare profession based on clinical assessment, scientific rehabilitation, movement analysis, and functional recovery. It is not simply massage, machine application, or random exercise prescription.",
          "Correct rehabilitation can improve recovery outcomes, while inappropriate rehabilitation may delay recovery, reduce functional independence, and increase complications.",
          "The purpose of this article is public awareness and patient safety.",
        ],
      },
      {
        heading: "Why Choosing the Right Physiotherapist Matters",
        paragraphs: [
          "Physiotherapy plays an important role in neurological and musculoskeletal conditions such as stroke rehabilitation, paralysis recovery, Parkinson’s disease, brain and spinal cord injury, joint pain and arthritis, post-operative rehabilitation, balance and walking problems, and sports and spine rehabilitation.",
          "In these conditions, treatment quality directly affects recovery outcomes and long-term functional independence.",
          "The right rehabilitation approach can help improve movement quality, balance and coordination, strength and endurance, walking ability, functional independence, and confidence in daily activities.",
        ],
      },
      {
        heading: "Before Starting Treatment — Ask About Qualification",
        paragraphs: [
          "Families should always verify whether the treating professional has a Bachelor Degree in Physiotherapy (BPT) or higher qualification, a degree from a UGC-approved university, and professional registration before independent clinical practice.",
          "Patients have the right to ask about qualification, registration, and professional background before starting rehabilitation.",
          "Professional qualification and registration are important parts of responsible and ethical clinical practice.",
        ],
      },
      {
        heading: "Verify Professional Registration",
        paragraphs: [
          "Before appointing a physiotherapist, families should ask whether the therapist is professionally registered under the Paramedical Council or Allied Health Sciences Council/Authority, as applicable.",
          "Professional registration reflects accountability, professional recognition, and clinical responsibility.",
        ],
      },
      {
        heading: "Understand the Treatment Approach",
        paragraphs: [
          "Before beginning rehabilitation, families should understand what treatment approach will be used, what the rehabilitation goals are, which techniques will be used, and how progress will be monitored.",
          "A professional physiotherapist should clearly explain the treatment plan and rehabilitation progression.",
          "At Movement Rehab, we believe patient education is an important part of rehabilitation care.",
        ],
      },
      {
        heading: "Rehabilitation Is More Than Machines and Modalities",
        paragraphs: [
          "One common misconception is that physiotherapy mainly means machines or modalities. While modalities may be useful in selected conditions, experienced physiotherapists usually focus more on manual therapy, functional rehabilitation, movement correction, motor control training, balance and coordination training, scientific exercise prescription, and long-term functional improvement.",
          "Effective rehabilitation focuses not only on temporary relief, but also on restoring movement quality, confidence, and independence.",
        ],
      },
      {
        heading: "Proper Assessment Is Essential",
        paragraphs: [
          "Scientific rehabilitation always begins with proper assessment. A professional physiotherapist evaluates muscle strength, balance and coordination, functional ability, walking pattern, posture and movement quality, pain and physical limitations, and safety risks.",
          "Every patient condition is different, and rehabilitation should always be individualized according to patient needs.",
        ],
      },
      {
        heading: "Awareness Regarding Professional Responsibility",
        paragraphs: [
          "Physiotherapy students require supervised clinical exposure as part of their education and training process.",
          "Families should ensure that independent patient treatment is being provided by an appropriately qualified and professionally registered physiotherapy practitioner.",
          "Patients deserve transparency regarding qualification, registration status, clinical experience, and professional responsibility. This becomes especially important in neurological rehabilitation, elderly care, and home physiotherapy services.",
        ],
      },
      {
        heading: "Common Mistakes Families Make While Hiring a Physiotherapist",
        paragraphs: [
          "Choosing only based on low cost or convenience can affect rehabilitation quality because good rehabilitation requires proper clinical knowledge, planning, and professional experience.",
          "Starting treatment without verification is another common mistake. Always verify qualification and registration before beginning therapy.",
          "True rehabilitation focuses on long-term functional improvement and independence, not only temporary relief.",
          "Every patient condition is different. Incorrect exercises or random internet exercises may delay recovery or increase complications.",
        ],
      },
      {
        heading: "Questions Every Family Should Ask",
        paragraphs: [
          "Before starting treatment, ask about the therapist’s qualification, professional registration, experience with the condition, treatment approach, progress monitoring, and rehabilitation goals.",
          "A genuine professional will always answer these questions clearly and confidently.",
        ],
      },
      {
        heading: "Why Professional Rehabilitation Matters",
        paragraphs: [
          "Scientific and evidence-based rehabilitation helps patients improve movement quality, regain confidence, reduce dependency in daily activities, improve balance and walking ability, prevent secondary complications, and improve overall quality of life.",
          "Recovery is not only about movement. It is about restoring independence, confidence, functional ability, and participation in daily life.",
          "Correct rehabilitation at the right time can make a significant difference in long-term recovery outcomes.",
        ],
      },
      {
        heading: "Our Purpose Behind This Awareness",
        paragraphs: [
          "This article is not written to criticize any individual or profession.",
          "Our purpose is to encourage safer healthcare decisions through awareness, patient education, and responsible rehabilitation practices.",
          "At Movement Rehab, we believe informed patients and families can make better rehabilitation decisions and achieve better recovery outcomes.",
          "Awareness is the first step toward safe, ethical, and effective physiotherapy care.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Rehabilitation Is More Than Machines",
    category: "Rehabilitation Awareness",
    description:
      "Physiotherapy is more than machines, heat, or ultrasound. True rehabilitation focuses on movement, function, and long-term recovery.",
    sections: [
      {
        heading: "True Rehabilitation Goes Beyond Machines",
        paragraphs: [
          "Many people believe physiotherapy mainly means electrical machines, heat therapy, or ultrasound treatment. While electrotherapy modalities can be useful supportive tools in selected conditions, physiotherapy and rehabilitation are much more than machine-based treatment alone.",
          "True rehabilitation focuses on understanding movement problems, improving functional ability, restoring independence, and guiding patients toward long-term recovery and wellness.",
        ],
      },
      {
        heading: "What Experienced Physiotherapists Focus On",
        paragraphs: [
          "An experienced physiotherapist usually focuses more on detailed clinical assessment, movement analysis, manual therapy, functional rehabilitation, motor control training, scientific exercise prescription, balance and coordination training, and long-term recovery and wellness.",
          "The real strength of physiotherapy lies in understanding human movement, identifying functional problems, and guiding patients toward safe, evidence-based, and long-term recovery.",
        ],
      },
      {
        heading: "Quality Rehabilitation Depends on Planning",
        paragraphs: [
          "Good rehabilitation is not defined by the number of machines used during treatment. True rehabilitation quality depends more on clinical reasoning, treatment planning, functional improvement, patient education, exercise guidance, and long-term outcomes.",
          "In many neurological and musculoskeletal conditions, proper exercise guidance and movement training play a major role in restoring independence and improving quality of life.",
          "At Movement Rehab, our focus remains on evidence-based, patient-centered rehabilitation aimed at improving movement quality, functional ability, and long-term wellness.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is not intended to criticize any individual, clinic, or treatment modality.",
          "Electrotherapy modalities can be beneficial when used appropriately as part of a comprehensive rehabilitation program.",
          "The purpose of this awareness article is simply to help patients and families better understand the importance of clinical assessment, functional rehabilitation, exercise guidance, and evidence-based physiotherapy care for long-term recovery outcomes.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Why Long-Term Home Care May Not Always Be the Best Option",
    category: "Home Care Rehab",
    description:
      "Home physiotherapy is helpful in early recovery, but long-term clinic rehabilitation may support better functional progress in many cases.",
    sections: [
      {
        heading: "Home Care Is Helpful, But Not Always Forever",
        paragraphs: [
          "At Movement Rehab, we often see families continuing home physiotherapy for many months even after the patient becomes stable and physically able to travel to a rehabilitation clinic.",
          "Home care physiotherapy can be very helpful during the early stage of recovery, especially when the patient has difficulty travelling or moving independently. However, in many neurological, musculoskeletal, and geriatric conditions, continuing only home-based rehabilitation for a long period may sometimes slow overall recovery progression.",
        ],
      },
      {
        heading: "Benefits of Clinic-Based Rehabilitation",
        paragraphs: [
          "Once the patient becomes medically stable and able to visit a rehabilitation center, clinic-based rehabilitation may provide additional benefits such as better gait and balance training, more functional activity practice, structured rehabilitation environment, better progression monitoring, improved patient motivation, social interaction and engagement, and increased confidence during movement.",
        ],
      },
      {
        heading: "Recovery Is Physical, Emotional, and Social",
        paragraphs: [
          "In neurological, musculoskeletal, and geriatric rehabilitation, recovery is not only physical — emotional and social recovery are also very important.",
          "Many patients gradually reduce social interaction because of fear of falling, lack of confidence, dependency on family, anxiety during movement, and emotional stress after illness or aging-related limitations.",
          "A rehabilitation center environment may help patients reconnect socially, improve confidence in daily activities, stay mentally motivated, reduce fear during movement, and become more active and independent.",
          "Interaction with therapists, staff, and other recovering patients often creates a positive and encouraging rehabilitation environment.",
        ],
      },
      {
        heading: "Choosing the Right Environment",
        paragraphs: [
          "In many cases, clinic rehabilitation may also help reduce feelings of isolation, low confidence, inactivity, and depression commonly seen after neurological injury, musculoskeletal limitations, or prolonged age-related health conditions.",
          "Every patient condition is different. Therefore, the decision between home care and clinic rehabilitation should always depend on patient safety, functional goals, medical condition, and professional clinical guidance.",
          "The purpose of this awareness article is not to criticize home care rehabilitation, but to help patients and families better understand the importance of choosing the right rehabilitation environment according to patient needs and recovery stage.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Movement Is Medicine — When Guided Correctly",
    category: "Movement & Wellness",
    description:
      "Modern sedentary habits reduce natural movement. Safe, guided movement supports joint health, recovery, and independence.",
    sections: [
      {
        heading: "Modern Lifestyle and Loss of Natural Movement",
        paragraphs: [
          "At Movement Rehab, we are increasingly observing joint pain, stiffness, reduced flexibility, and movement-related problems in people of all age groups — from teenagers to senior citizens.",
          "One important reason may be the gradual reduction of natural daily-life movements in modern lifestyle patterns.",
          "With changing lifestyle habits and increasing influence of modern sedentary culture, many traditional Indian functional movements are becoming less common in daily life.",
          "Earlier, daily activities naturally included movements such as floor sitting, cross-leg sitting, traditional toileting positions, sitting during पूजा, meals, and social activities, outdoor games and physical play in children, and more active daily routines.",
          "Today, many people spend long hours sitting on chairs, using mobile phones and laptops, watching screens, living with reduced physical activity, and replacing outdoor movement with virtual activities.",
          "Exercise and fitness are important, but functional movement in daily life is equally important for joint health and overall wellness.",
        ],
      },
      {
        heading: "Human Body Is Designed for Movement",
        paragraphs: [
          "The human body is designed to move in different directions and perform a variety of functional activities.",
          "Regular movement helps maintain joint mobility, improve flexibility, support muscle strength, improve balance and coordination, maintain circulation and joint nutrition, and reduce stiffness and inactivity-related problems.",
          "Reduced movement over long periods may gradually contribute to joint stiffness, weakness, reduced flexibility, poor posture, movement fear, and functional limitations.",
        ],
      },
      {
        heading: "Functional Movement Is Different From Only Exercise",
        paragraphs: [
          "Exercise is beneficial, but daily functional movement also plays an important role in maintaining physical health.",
          "Functional movement includes sitting and standing naturally, squatting safely, walking confidently, reaching and bending, floor mobility, balance during daily activities, and coordinated body movement.",
          "In neurological, musculoskeletal, and geriatric rehabilitation, functional movement training is often an important part of recovery and long-term independence.",
        ],
      },
      {
        heading: "Importance of Guided and Safe Movement",
        paragraphs: [
          "Every person’s body condition is different. Therefore, movement and exercise should always be guided according to age, physical condition, joint mobility, balance ability, medical history, and functional goals.",
          "Incorrect movement patterns or inactivity may increase physical stress and movement-related problems over time.",
          "Professional rehabilitation focuses on helping patients move safely, confidently, and functionally.",
        ],
      },
      {
        heading: "Final Message",
        paragraphs: [
          "Movement is not only exercise — it is an essential part of healthy living, recovery, and independence.",
          "The body often becomes stronger, more flexible, and functionally active when movement is regularly and safely used in daily life.",
          "At Movement Rehab, our focus is on evidence-based, patient-centered rehabilitation aimed at improving movement quality, functional ability, and long-term wellness.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is intended only for public awareness and health education.",
          "The purpose is not to criticize any lifestyle, exercise method, or culture, but to encourage awareness regarding the importance of safe movement, functional activity, and balanced physical health in modern life.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Role of Physiotherapy in Neurological Recovery",
    category: "Neuro Rehab",
    description:
      "Neurological physiotherapy helps patients regain movement, function, confidence, and independence through scientific rehabilitation.",
    sections: [
      {
        heading: "Understanding Physiotherapy Beyond Exercise",
        paragraphs: [
          "Today, the word physiotherapy is commonly heard in almost every family. Many people require physiotherapy at some stage of life due to pain, injury, surgery, neurological conditions, aging-related problems, or movement difficulties.",
          "However, physiotherapy is not simply exercise, massage, or machine-based treatment.",
          "Physiotherapy is a detailed and scientifically developed branch of health science based on anatomy, physiology, neurology, biomechanics, movement science, and evidence-based rehabilitation principles.",
          "It is a globally accepted healthcare profession focused on improving movement, function, independence, and quality of life through scientific rehabilitation approaches.",
          "At Movement Rehab, we believe patient and family awareness is extremely important for understanding the real role of physiotherapy in neurological recovery.",
        ],
      },
      {
        heading: "Why Physiotherapy Is Important in Neurological Conditions",
        paragraphs: [
          "In neurological conditions such as brain stroke, paralysis, Parkinson’s disease, brain injury, and spinal cord injury, patients and families often go through physically and emotionally difficult phases.",
          "In neurological conditions, the primary problem usually affects the brain, spinal cord, or nervous system. Because the nervous system controls movement and body function, patients may develop difficulties in upper limb and lower limb movement, balance and coordination, trunk control, walking ability, hand function, posture, and functional activities.",
          "This is why neurological rehabilitation is very different from general exercise programs.",
          "In many neurological cases, healthcare professionals recommend physiotherapy rehabilitation because recovery requires more than medicines alone.",
          "Neurological physiotherapy focuses on helping patients regain movement, function, confidence, and independence through scientific rehabilitation approaches.",
        ],
      },
      {
        heading: "Neurological Physiotherapy Is More Than Basic Exercise",
        paragraphs: [
          "Many people think physiotherapy only means straight-line exercises or simple repetitive movements. In reality, neurological physiotherapy is much more specialized and functional.",
          "Neurological rehabilitation focuses on helping the brain and nervous system relearn movement patterns and functional activities through guided rehabilitation practice.",
          "In simple terms, neurological physiotherapy helps train the brain again for movement and daily functional activities.",
          "This process is based on neuroplasticity principles, motor learning, motor control training, functional rehabilitation, and task-oriented movement practice.",
          "The goal is not only moving muscles, but improving movement quality, balance, coordination, posture, and functional independence.",
        ],
      },
      {
        heading: "Scientific Approaches Used in Neurological Physiotherapy",
        paragraphs: [
          "Professional neurological rehabilitation may include balance and coordination training, gait and walking practice, weight-bearing activities, functional movement retraining, trunk stability training, hand function activities, postural correction, and functional task practice.",
          "Different scientific rehabilitation approaches may be used according to patient condition and recovery goals, such as PNF, NDT, Brunnstrom Approach, Motor Learning Approaches, and Functional Rehabilitation Training.",
          "These approaches help improve movement control, coordination, functional activities, balance reactions, walking ability, and confidence during movement.",
          "When rehabilitation is guided scientifically and consistently, many neurological patients can achieve meaningful functional improvement and become more independent in daily life.",
        ],
      },
      {
        heading: "Importance of Motor Learning and Motor Control",
        paragraphs: [
          "Neurological rehabilitation is not only about movement repetition.",
          "The brain and nervous system require repeated, meaningful, and functional movement practice to improve motor control and functional recovery.",
          "Motor learning and motor control principles help patients relearn movement patterns, improve balance and posture, improve coordination, improve walking ability, increase confidence during activities, and improve functional independence.",
          "This is why evidence-based neurological rehabilitation is extremely important after stroke and other neurological conditions.",
        ],
      },
      {
        heading: "Recovery Is a Journey",
        paragraphs: [
          "Every neurological patient recovers differently. Recovery depends on severity of condition, early rehabilitation, consistency during therapy, family support, patient motivation, and scientific rehabilitation planning.",
          "Recovery is not only physical — emotional and social support are also very important during the rehabilitation journey.",
          "With proper rehabilitation guidance, patient participation, and regular therapy, many patients can improve functional ability and regain independence in daily life.",
        ],
      },
      {
        heading: "Final Message",
        paragraphs: [
          "Physiotherapy is not just exercise, massage, or machine-based treatment.",
          "It is a scientific healthcare profession focused on restoring movement, function, confidence, independence, and quality of life through evidence-based rehabilitation.",
          "In neurological rehabilitation, correct guidance, scientific approaches, and functional movement training can make a significant difference in recovery outcomes.",
          "At Movement Rehab, our focus remains on ethical, evidence-based, and patient-centered neurological rehabilitation aimed at improving movement quality, functional independence, and long-term recovery outcomes.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is intended only for public awareness and patient education.",
          "The purpose is not to replace medical advice or criticize any treatment approach, but to help patients and families better understand the scientific role of neurological physiotherapy and rehabilitation in recovery.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Physical Preparation Needs More Than Running Practice",
    category: "Sports Rehab",
    description:
      "Students preparing for defence, police, and physical exams need smart training, recovery, strength, and injury prevention.",
    sections: [
      {
        heading: "Understanding Sports and Physical Injuries in Competitive Exam Preparation",
        paragraphs: [
          "At Movement Rehab, we often see students preparing for government, defence, police, and physical recruitment examinations who work extremely hard in both theoretical studies and ground practice.",
          "Many students score well academically, but unfortunately become physically injured during preparation and are unable to perform properly in physical tests.",
          "In many cases, the problem is not lack of effort — the problem is lack of proper fitness awareness, recovery planning, and scientific physical preparation.",
        ],
      },
      {
        heading: "Physical Fitness Is Not Optional",
        paragraphs: [
          "In defence, police, and other physical competitive examinations, fitness is not only part of the exam — it is one of the most important requirements.",
          "However, many students focus mainly on running practice, daily ground sessions, increasing repetitions, and competing with friends while ignoring strength training, mobility, recovery, flexibility, individual fitness level, and injury prevention.",
          "This imbalance often increases the risk of injury.",
        ],
      },
      {
        heading: "Group Practice Without Individual Fitness Understanding",
        paragraphs: [
          "One common issue seen in many small cities and local training groups is that students with completely different strength levels, fitness capacity, body weight, endurance, and recovery ability practice together with the same intensity.",
          "Many students try to match the performance of stronger or more experienced trainees without understanding their own body capacity.",
          "This often leads to knee pain, shin pain, muscle strain, ankle injury, back pain, overtraining fatigue, stress fracture, and reduced performance.",
          "Fitness preparation should always be individualized according to the student’s physical condition and recovery ability.",
        ],
      },
      {
        heading: "More Workout Does Not Always Mean Better Performance",
        paragraphs: [
          "Many students believe that excessive running and continuous practice without rest will improve performance faster.",
          "Improper training without recovery may actually reduce muscle recovery, performance quality, strength, stamina, and joint health.",
          "Overtraining before exams may increase the risk of injury exactly at the time when performance matters the most.",
          "The body needs recovery, proper progression, mobility work, strength conditioning, and balanced training for safe and effective physical improvement.",
        ],
      },
      {
        heading: "Importance of Strength and Conditioning",
        paragraphs: [
          "Many students practice only running or physical drills without proper strength and conditioning training.",
          "Scientific strength and conditioning may help improve muscle strength, joint stability, endurance, running efficiency, injury prevention, and recovery ability.",
          "A physically prepared body usually performs better and tolerates training load more safely.",
        ],
      },
      {
        heading: "Proper Physical Preparation Needs More Than Hard Work",
        paragraphs: [
          "Safe and effective physical preparation also depends on proper sports shoes, suitable ground surface, scientific strength and conditioning, proper warm-up and recovery, nutrition and hydration, adequate sleep, correct training progression, and physiotherapy or injury prevention guidance when needed.",
          "Training continuously on unsuitable surfaces or with improper footwear may increase stress on joints, muscles, and ligaments.",
          "Similarly, lack of proper strength training, recovery, and nutrition may reduce physical performance and increase the risk of overuse injuries.",
          "Professional guidance from strength and conditioning coaches, physiotherapists, and nutrition professionals may help students train more safely and effectively according to their body capacity and fitness goals.",
          "Physical preparation should always be progressive, individualized, and based on body capacity, recovery ability, strength level, mobility, endurance, and injury history.",
          "Students who understand recovery, proper conditioning, and scientific training often maintain more consistent performance and recover faster from minor injuries.",
        ],
      },
      {
        heading: "Students Often Ignore Early Injury Signs",
        paragraphs: [
          "Many students continue training even after persistent pain, muscle tightness, swelling, fatigue, and joint discomfort because they fear missing practice sessions.",
          "Ignoring small problems may gradually convert minor injuries into serious conditions that affect exam preparation and performance.",
          "Early guidance and proper rehabilitation are important for preventing long-term injury.",
        ],
      },
      {
        heading: "Role of Physiotherapy in Sports and Physical Preparation",
        paragraphs: [
          "Physiotherapy is not only for treatment after injury.",
          "Sports and fitness physiotherapy may help students with injury prevention, mobility improvement, recovery guidance, muscle imbalance correction, strength progression, running mechanics, flexibility training, and safe return to practice.",
          "Professional guidance helps students train more safely and according to their individual fitness level.",
        ],
      },
      {
        heading: "Smart Training Is Better Than Excessive Training",
        paragraphs: [
          "In our clinical experience, students who understand recovery importance, train according to their body capacity, follow proper rehabilitation, and focus on long-term fitness often recover faster and perform more consistently.",
          "On the other hand, students who continuously overtrain without recovery may struggle with repeated injuries and reduced performance before examinations.",
          "Consistency and smart preparation are more important than excessive training.",
        ],
      },
      {
        heading: "Final Message",
        paragraphs: [
          "Competitive exam preparation requires both mental and physical preparation.",
          "Fitness should not be ignored while preparing for physically demanding careers.",
          "Scientific training under professional guidance from qualified strength and conditioning coaches, physiotherapists, rehabilitation professionals, and nutrition experts is important for long-term performance, injury prevention, recovery, and overall physical wellness.",
          "At Movement Rehab, our goal is to spread awareness regarding safe training, injury prevention, rehabilitation, and evidence-based physical wellness for students, athletes, and active individuals.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is intended only for public awareness and educational purposes.",
          "The purpose is not to criticize any coaching method or training group, but to encourage safer fitness practices, injury awareness, and balanced physical preparation among students preparing for physically demanding examinations.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Respect the Pain — Don’t Ignore What Your Body Is Telling You",
    category: "Pain Education",
    description:
      "Pain is often a protective signal. Safe rehabilitation respects pain, corrects movement, and improves function scientifically.",
    sections: [
      {
        heading: "Understanding Pain Beyond Temporary Discomfort",
        paragraphs: [
          "At Movement Rehab, during our clinical journey, we have observed that many people with musculoskeletal conditions ignore pain for a long time or misunderstand its meaning.",
          "Many patients believe that more pain means better recovery, pain during exercise is always normal, or if exercise increases pain, the body is improving.",
          "In many situations, this understanding may be incorrect.",
          "Pain is not always the enemy — it is often a protective signal from the body.",
          "The body uses pain as a warning mechanism to indicate that tissues may be overloaded, recovery may be insufficient, a movement pattern may be incorrect, a joint or muscle may be under excessive stress, or rest, correction, and proper rehabilitation may be needed.",
          "Understanding pain correctly is an important part of safe rehabilitation and long-term recovery.",
        ],
      },
      {
        heading: "Pain Is a Messenger of the Body",
        paragraphs: [
          "Pain is one of the body’s natural protective mechanisms.",
          "It may indicate mechanical stress, muscle overload, joint irritation, movement dysfunction, poor posture, reduced mobility, inflammation, tissue strain, underlying pathology, or a medical condition.",
          "In some cases, pain may also be the body’s early warning sign that something requires proper attention, assessment, rest, or medical evaluation.",
          "Ignoring these warning signs for long periods may sometimes increase the risk of chronic pain, movement limitation, or worsening of the underlying condition.",
        ],
      },
      {
        heading: "More Pain Does Not Always Mean Better Recovery",
        paragraphs: [
          "One common misconception is that if exercise is painful, it must be working.",
          "In reality, excessive pain during movement or exercise may sometimes indicate incorrect exercise technique, poor biomechanics, excessive loading, inappropriate exercise progression, movement compensation, or joint stress.",
          "A scientifically guided rehabilitation program focuses on improving movement quality, not simply increasing pain tolerance.",
        ],
      },
      {
        heading: "Good Rehabilitation Focuses on Correct Movement",
        paragraphs: [
          "A professional physiotherapy approach focuses on clinical assessment, biomechanical analysis, correct posture and movement, appropriate exercise progression, functional improvement, and safe loading of tissues.",
          "A good physiotherapist does not intentionally increase pain unnecessarily during rehabilitation.",
          "Instead, treatment is usually modified according to patient condition, tissue healing stage, pain response, functional goals, and movement quality.",
          "The goal is to improve function safely and effectively while reducing unnecessary stress on the body.",
        ],
      },
      {
        heading: "Pain During Exercise Should Be Properly Understood",
        paragraphs: [
          "Not every discomfort during rehabilitation is harmful, but persistent or aggravated pain should never be ignored.",
          "This is why proper guidance is important during strength training, sports rehabilitation, joint rehabilitation, postural correction, neurological rehabilitation, and exercise progression.",
          "Exercise should help improve movement quality, stability, strength, flexibility, and functional confidence — not create avoidable tissue stress and fear of movement.",
        ],
      },
      {
        heading: "Why Biomechanics Matter",
        paragraphs: [
          "The body moves according to biomechanical principles.",
          "Incorrect posture, poor movement patterns, muscle imbalance, or improper loading may gradually increase stress on joints, muscles, and ligaments.",
          "Scientific physiotherapy focuses on identifying and correcting these movement-related problems through assessment, functional movement analysis, manual therapy, corrective exercise, and movement retraining.",
        ],
      },
      {
        heading: "Final Message",
        paragraphs: [
          "Pain should not always be ignored, and it should not always be considered a sign of good recovery.",
          "Respecting pain means understanding what the body may be trying to communicate.",
          "Safe rehabilitation focuses on correct movement, scientific progression, tissue healing, and long-term functional recovery — not simply pushing through pain.",
          "At Movement Rehab, our goal is to spread awareness regarding evidence-based rehabilitation, safe movement, and long-term musculoskeletal wellness.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is intended only for public awareness and patient education.",
          "The purpose is not to create fear regarding exercise or rehabilitation, but to encourage safer movement practices, proper professional guidance, and better understanding of pain and recovery.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Regular Health Check-Ups and Timely Medicines Can Prevent Serious Health Problems",
    category: "Health Awareness",
    description:
      "Regular medical follow-up, timely medicines, and healthy habits can reduce the risk of serious neurological and cardiac complications.",
    sections: [
      {
        heading: "Prevention Is Better Than Cure",
        paragraphs: [
          "At Movement Rehab, during our clinical experience, we have observed that many neurological and cardiac patients have a past history of high blood pressure, heart-related conditions, diabetes, cholesterol imbalance, irregular medication use, and poor health monitoring.",
          "In many cases, patients stop medicines on their own, miss regular follow-ups, or ignore medical advice once they start feeling temporarily better.",
          "Sometimes, ignoring timely medicines or stopping treatment without guidance from a qualified medical practitioner may increase the risk of serious and life-threatening conditions such as brain stroke, heart attack, sudden cardiac complications, paralysis, circulation-related problems, and other major health complications.",
          "This is why regular medical follow-up and responsible healthcare habits are extremely important.",
        ],
      },
      {
        heading: "Many Serious Conditions Develop Gradually",
        paragraphs: [
          "One important reality is that many health problems develop slowly over time.",
          "Conditions such as high blood pressure, diabetes, heart disease, vascular problems, and neurological conditions may not always show strong symptoms during the early stage.",
          "Because of this, many people ignore mild symptoms, fatigue, headache, dizziness, breathlessness, body weakness, and increased stress levels until a major health event occurs.",
        ],
      },
      {
        heading: "Fear of Health Check-Up Should Not Delay Care",
        paragraphs: [
          "We often observe that many people avoid regular health check-ups because of fear of diagnosis, busy lifestyle, neglect of health, or believing everything is normal.",
          "However, timely health check-ups may help identify early warning signs, blood pressure changes, blood sugar imbalance, cardiac risk factors, neurological warning symptoms, and other medical conditions.",
          "Early detection often allows earlier treatment and better long-term outcomes.",
          "Regular health monitoring should be considered a healthy habit, especially in modern lifestyle conditions.",
        ],
      },
      {
        heading: "Prevention and Awareness Are Important",
        paragraphs: [
          "Healthy lifestyle habits may help reduce long-term health risks.",
          "Important preventive habits include regular medical check-ups, following prescribed medicines properly, physical activity and movement, stress management, proper sleep, balanced nutrition, timely medical consultation, and avoiding self-medication or stopping medicines without advice.",
          "In many cases, prevention and early care may help avoid major complications in the future.",
        ],
      },
      {
        heading: "Follow Guidance From Qualified Healthcare Professionals",
        paragraphs: [
          "Treatment decisions related to medicines, blood pressure management, heart conditions, neurological symptoms, exercise, and rehabilitation should always be guided by qualified and registered healthcare professionals.",
          "Stopping medicines or changing treatment without proper medical guidance may sometimes become dangerous.",
        ],
      },
      {
        heading: "Final Message",
        paragraphs: [
          "Health problems should not be ignored, and regular health check-ups should not be feared.",
          "Early awareness, timely diagnosis, proper medical care, and healthy lifestyle habits may help reduce the risk of serious neurological and cardiac complications.",
          "Prevention is often better, safer, and easier than managing advanced disease conditions.",
          "At Movement Rehab, our goal is to spread awareness regarding responsible healthcare habits, rehabilitation, movement, and long-term wellness.",
        ],
      },
      {
        heading: "Important Note",
        paragraphs: [
          "This article is intended only for public awareness and health education.",
          "The purpose is not to create fear regarding disease or medicines, but to encourage responsible healthcare decisions, regular health monitoring, timely medical consultation, and healthy lifestyle awareness.",
        ],
      },
    ],
  },
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filteredBlogs = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ");

    if (!query) return blogs;

    const keywords = query.split(" ").filter(Boolean);

    return blogs
      .map((blog) => {
        const searchableText = [
          blog.title,
          blog.category,
          blog.description,
          ...blog.sections.flatMap((section) => [
            section.heading,
            ...section.paragraphs,
          ]),
        ]
          .join(" ")
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, " ")
          .replace(/\s+/g, " ");

        const title = blog.title.toLowerCase();
        const category = blog.category.toLowerCase();

        let score = 0;

        keywords.forEach((word) => {
          if (title.includes(word)) score += 5;
          if (category.includes(word)) score += 3;
          if (blog.description.toLowerCase().includes(word)) score += 2;
          if (searchableText.includes(word)) score += 1;
        });

        if (title.includes(query)) score += 10;
        if (category.includes(query)) score += 6;
        if (searchableText.includes(query)) score += 4;

        return { ...blog, searchScore: score };
      })
      .filter((blog) => blog.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
  }, [search]);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedBlog) {
    return (
      <main className="bg-white pt-24 sm:pt-28 lg:pt-32">
        <section className="px-4 sm:px-6 lg:px-20 pb-14">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={closeBlog}
              className="mb-6 inline-flex items-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-[#003A80] hover:bg-gray-50"
            >
              ← Back to Blogs
            </button>

            <div className="rounded-3xl bg-gray-50 p-5 shadow-sm sm:p-8 lg:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#00C4CD]">
                  {selectedBlog.category}
                </p>

                <h1 className="text-3xl font-semibold leading-tight text-[#003A80] sm:text-4xl lg:text-5xl">
                  {selectedBlog.title}
                </h1>

                <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
                  {selectedBlog.description}
                </p>
            </div>

            <article className="mt-10 space-y-9 rounded-3xl bg-white text-gray-700">
              {selectedBlog.sections.map((section, index) => (
                <section
                  key={`${selectedBlog.id}-${index}`}
                  className="border-b border-gray-100 pb-8 last:border-b-0"
                >
                  <h2 className="mb-4 text-2xl font-semibold text-[#003A80]">
                    {section.heading}
                  </h2>

                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-[15px] leading-8 text-gray-700 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <div className="mt-12 rounded-3xl bg-gray-50 p-6 text-center sm:p-10">
              <h3 className="text-2xl font-semibold text-[#003A80]">
                Need Professional Physiotherapy Advice?
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Book a consultation with Movement Rehab for patient-centered
                physiotherapy and rehabilitation guidance.
              </p>

              <button
                onClick={() => navigate("/Appointment")}
                className="mt-6 rounded-xl bg-[#003A80] px-8 py-4 font-medium text-white transition hover:bg-[#002c63]"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="bg-gray-50 px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
        <p className="mb-3 font-semibold text-[#00C4CD]">OUR BLOG</p>

        <h1 className="mx-auto mb-6 max-w-4xl text-3xl font-semibold text-[#003A80] sm:text-4xl lg:text-5xl">
          Physiotherapy Insights & Patient Awareness
        </h1>

        <p className="mx-auto max-w-2xl text-gray-600">
          Evidence-based rehabilitation guidance, patient safety awareness, and
          wellness education from Movement Rehab.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-white shadow-sm sm:flex-row">
            <input
              type="text"
              placeholder="Search by topic, condition, pain, stroke, home care..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-[#003A80]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-[#003A80] hover:bg-gray-50"
              >
                Clear
              </button>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Search works across blog title, category, headings, and full article content.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          <div className="max-w-4xl">
            <p className="mb-2 font-medium text-[#00C4CD]">
              Featured Article
            </p>

            <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#003A80] sm:text-3xl lg:text-4xl">
              {blogs[0].title}
            </h2>

            <p className="mb-6 leading-7 text-gray-600">
              {blogs[0].description}
            </p>

            <button
              onClick={() => openBlog(blogs[0])}
              className="rounded-xl bg-[#003A80] px-6 py-3 font-medium text-white transition hover:bg-[#002c63]"
            >
              Read Article →
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-20 lg:pb-32">
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-4">
          <div>
            <p className="font-medium text-[#00C4CD]">Latest Articles</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#003A80] sm:text-3xl">
              Read Health & Rehabilitation Blogs
            </h2>
          </div>

          <p className="hidden text-sm text-gray-500 sm:block">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="mx-auto max-w-7xl rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <h3 className="text-xl font-semibold text-[#003A80]">
              No blogs found
            </h3>
            <p className="mt-2 text-gray-500">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group rounded-3xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="p-6">
                  <p className="mb-2 text-sm font-medium text-[#00C4CD]">
                    {blog.category}
                  </p>

                  <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-snug text-[#003A80]">
                    {blog.title}
                  </h3>

                  <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {blog.description}
                  </p>

                  <button
                    onClick={() => openBlog(blog)}
                    className="font-medium text-[#003A80] transition hover:text-[#00C4CD]"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50 px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="mb-4 text-3xl font-semibold text-[#003A80] sm:text-4xl">
          Need Professional Physiotherapy Advice?
        </h2>

        <p className="mb-8 text-gray-600">
          Book a consultation with our expert physiotherapists today.
        </p>

        <button
          onClick={() => navigate("/Appointment")}
          className="rounded-xl bg-[#003A80] px-8 py-4 text-white transition hover:bg-[#002c63]"
        >
          Book Consultation
        </button>
      </section>
    </main>
  );
};

export default BlogPage;
