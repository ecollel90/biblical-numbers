const { useState, useEffect } = React;

function App() {
  const [searchNumber, setSearchNumber] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [translation, setTranslation] = useState("ESV");

  // Database of significant biblical numbers
  const numberDatabase = {
    1: {
      significance: "Unity, primacy, and the nature of God",
      scriptures: [
        { reference: "Deuteronomy 6:4", text: "Hear, O Israel: The LORD our God, the LORD is one." },
        { reference: "Ephesians 4:5-6", text: "One Lord, one faith, one baptism, one God and Father of all, who is over all and through all and in all." },
        { reference: "John 10:30", text: "I and the Father are one." },
        { reference: "Galatians 3:20", text: "Now an intermediary implies more than one, but God is one." }
      ]
    },
    2: {
      significance: "Witness, union, division, and partnership",
      scriptures: [
        { reference: "Ecclesiastes 4:9", text: "Two are better than one because they have a good return for their labor." },
        { reference: "Matthew 18:20", text: "For where two or three gather in my name, there am I with them." },
        { reference: "Genesis 1:16", text: "God made the two great lights, the greater light to govern the day, and the lesser light to govern the night; He made the stars also." },
        { reference: "Deuteronomy 19:15", text: "A single witness shall not suffice against a person for any crime or for any wrong in connection with any offense that he has committed. Only on the evidence of two witnesses or of three witnesses shall a charge be established." },
        { reference: "Matthew 22:40", text: "On these two commandments depend the whole Law and the Prophets." }
      ]
    },
    3: {
      significance: "Divine perfection, completeness, and the Trinity",
      scriptures: [
        { reference: "Matthew 28:19", text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
        { reference: "1 John 5:7", text: "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one." },
        { reference: "Genesis 1:13", text: "And there was evening and there was morning, the third day." },
        { reference: "Jonah 1:17", text: "And the LORD appointed a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights." },
        { reference: "Matthew 12:40", text: "For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth." }
      ]
    },
    4: {
      significance: "Creation, the world, and earthly completeness",
      scriptures: [
        { reference: "Revelation 7:1", text: "After this I saw four angels standing at the four corners of the earth, holding back the four winds of the earth." },
        { reference: "Ezekiel 37:9", text: "Then he said to me, 'Prophesy to the breath; prophesy, son of man, and say to it, \"This is what the Sovereign Lord says: Come, breath, from the four winds and breathe into these slain, that they may live.\"'" },
        { reference: "Isaiah 11:12", text: "He will raise a signal for the nations and will assemble the banished of Israel, and gather the dispersed of Judah from the four corners of the earth." },
        { reference: "Revelation 4:6", text: "And before the throne there was as it were a sea of glass, like crystal. And around the throne, on each side of the throne, are four living creatures, full of eyes in front and behind." }
      ]
    },
    5: {
      significance: "Grace, God's goodness, and divine favor",
      scriptures: [
        { reference: "1 Corinthians 14:19", text: "But in the church I would rather speak five intelligible words to instruct others than ten thousand words in a tongue." },
        { reference: "Matthew 14:17", text: "'We have here only five loaves of bread and two fish,' they answered." },
        { reference: "Matthew 25:2", text: "Five of them were foolish, and five were wise." },
        { reference: "2 Corinthians 11:24", text: "Five times I received at the hands of the Jews the forty lashes less one." }
      ]
    },
    6: {
      significance: "Human weakness, imperfection, and sin",
      scriptures: [
        { reference: "Genesis 1:31", text: "God saw all that he had made, and it was very good. And there was evening, and there was morning—the sixth day." },
        { reference: "Exodus 20:9", text: "Six days you shall labor and do all your work." },
        { reference: "John 2:6", text: "Now there were six stone water jars there for the Jewish rites of purification, each holding twenty or thirty gallons." },
        { reference: "Revelation 4:8", text: "And the four living creatures, each of them with six wings, are full of eyes all around and within." }
      ]
    },
    7: {
      significance: "Perfection, completeness, and God's divine nature",
      scriptures: [
        { reference: "Genesis 2:2", text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
        { reference: "Revelation 1:20", text: "The mystery of the seven stars which thou sawest in my right hand, and the seven golden candlesticks. The seven stars are the angels of the seven churches: and the seven candlesticks which thou sawest are the seven churches." },
        { reference: "Joshua 6:4", text: "Seven priests shall bear seven trumpets of rams' horns before the ark. On the seventh day you shall march around the city seven times, and the priests shall blow the trumpets." },
        { reference: "Revelation 5:6", text: "And between the throne and the four living creatures and among the elders I saw a Lamb standing, as though it had been slain, with seven horns and with seven eyes, which are the seven spirits of God sent out into all the earth." },
        { reference: "Matthew 18:22", text: "Jesus said to him, 'I do not say to you seven times, but seventy-seven times.'" }
      ]
    },
    8: {
      significance: "New beginnings, resurrection, and regeneration",
      scriptures: [
        { reference: "Genesis 17:12", text: "For the generations to come every male among you who is eight days old must be circumcised." },
        { reference: "2 Peter 2:5", text: "If he did not spare the ancient world when he brought the flood on its ungodly people, but protected Noah, a preacher of righteousness, and seven others." },
        { reference: "1 Peter 3:20", text: "Because they formerly did not obey, when God's patience waited in the days of Noah, while the ark was being prepared, in which a few, that is, eight persons, were brought safely through water." },
        { reference: "Luke 9:28", text: "Now about eight days after these sayings he took with him Peter and John and James and went up on the mountain to pray." }
      ]
    },
    9: {
      significance: "Divine completeness, finality, and judgment",
      scriptures: [
        { reference: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
        { reference: "Luke 17:17", text: "Jesus asked, 'Were not all ten cleansed? Where are the other nine?'" },
        { reference: "Matthew 27:46", text: "And about the ninth hour Jesus cried out with a loud voice, saying, 'Eli, Eli, lema sabachthani?' that is, 'My God, my God, why have you forsaken me?'" },
        { reference: "Acts 3:1", text: "Now Peter and John were going up to the temple at the hour of prayer, the ninth hour." }
      ]
    },
    10: {
      significance: "Law, order, and responsibility",
      scriptures: [
        { reference: "Exodus 20:1-17", text: "The Ten Commandments" },
        { reference: "Matthew 25:1", text: "At that time the kingdom of heaven will be like ten virgins who took their lamps and went out to meet the bridegroom." },
        { reference: "Luke 15:8", text: "Or what woman, having ten silver coins, if she loses one coin, does not light a lamp and sweep the house and seek diligently until she finds it?" },
        { reference: "Revelation 2:10", text: "Do not fear what you are about to suffer. Behold, the devil is about to throw some of you into prison, that you may be tested, and for ten days you will have tribulation. Be faithful unto death, and I will give you the crown of life." }
      ]
    },
    11: {
      significance: "Disorder, chaos, and judgment",
      scriptures: [
        { reference: "Genesis 32:22", text: "That night Jacob got up and took his two wives, his two female servants and his eleven sons and crossed the ford of the Jabbok." },
        { reference: "Acts 1:26", text: "Then they cast lots, and the lot fell to Matthias; so he was added to the eleven apostles." },
        { reference: "Matthew 20:6", text: "And about the eleventh hour he went out and found others standing. And he said to them, 'Why do you stand here idle all day?'" },
        { reference: "John 11:9", text: "Jesus answered, 'Are there not twelve hours in the day? If anyone walks in the day, he does not stumble, because he sees the light of this world.'" }
      ]
    },
    12: {
      significance: "Governmental perfection and divine authority",
      scriptures: [
        { reference: "Matthew 10:1", text: "And when he had called unto him his twelve disciples, he gave them power against unclean spirits, to cast them out, and to heal all manner of sickness and all manner of disease." },
        { reference: "Revelation 21:12", text: "It had a great, high wall, with twelve gates, and at the gates twelve angels, and on the gates the names of the twelve tribes of the sons of Israel were inscribed." },
        { reference: "Genesis 49:28", text: "All these are the twelve tribes of Israel. This is what their father said to them as he blessed them, blessing each with the blessing suitable to him." },
        { reference: "Luke 2:42", text: "And when he was twelve years old, they went up according to custom." },
        { reference: "Revelation 22:2", text: "Through the middle of the street of the city; also, on either side of the river, the tree of life with its twelve kinds of fruit, yielding its fruit each month." }
      ]
    },
    13: {
      significance: "Rebellion, apostasy, and defection",
      scriptures: [
        { reference: "Genesis 14:4", text: "Twelve years they had served Chedorlaomer, but in the thirteenth year they rebelled." },
        { reference: "Mark 7:21-23", text: "For from within, out of the heart of men, proceed the evil thoughts, fornications, thefts, murders, adulteries, deeds of coveting and wickedness, as well as deceit, sensuality, envy, slander, pride and foolishness. All these evil things proceed from within and defile the man." },
        { reference: "Esther 3:13", text: "Letters were sent by couriers to all the king's provinces with instruction to destroy, to kill, and to annihilate all Jews, young and old, women and children, in one day, the thirteenth day of the twelfth month, which is the month of Adar, and to plunder their goods." }
      ]
    },
    14: {
      significance: "Deliverance or salvation",
      scriptures: [
        { reference: "Matthew 1:17", text: "So all the generations from Abraham to David were fourteen generations, and from David to the deportation to Babylon fourteen generations, and from the deportation to Babylon to the Christ fourteen generations." },
        { reference: "Exodus 12:6-7", text: "You shall keep it until the fourteenth day of this month, when the whole assembly of the congregation of Israel shall kill their lambs at twilight. Then they shall take some of the blood and put it on the two doorposts and the lintel of the houses in which they eat it." }
      ]
    },
    15: {
      significance: "Rest and acts of divine grace",
      scriptures: [
        { reference: "Leviticus 23:6", text: "And on the fifteenth day of the same month is the Feast of Unleavened Bread to the LORD; for seven days you shall eat unleavened bread." },
        { reference: "2 Kings 14:23", text: "In the fifteenth year of Amaziah the son of Joash, king of Judah, Jeroboam the son of Joash, king of Israel, began to reign in Samaria, and he reigned forty-one years." }
      ]
    },
    17: {
      significance: "Victory and spiritual perfection",
      scriptures: [
        { reference: "Genesis 7:11", text: "In the six hundredth year of Noah's life, in the second month, on the seventeenth day of the month, on that day all the fountains of the great deep burst forth, and the windows of the heavens were opened." },
        { reference: "Genesis 8:4", text: "And in the seventh month, on the seventeenth day of the month, the ark came to rest on the mountains of Ararat." }
      ]
    },
    19: {
      significance: "Faith and divine order",
      scriptures: [
        { reference: "Joshua 19:51", text: "These are the inheritances that Eleazar the priest and Joshua the son of Nun and the heads of the fathers' houses of the tribes of the people of Israel distributed by lot at Shiloh before the LORD, at the entrance of the tent of meeting. So they finished dividing the land." }
      ]
    },
    20: {
      significance: "Expectancy and redemption",
      scriptures: [
        { reference: "Genesis 31:38", text: "These twenty years I have been with you. Your ewes and your female goats have not miscarried, and I have not eaten the rams of your flocks." },
        { reference: "Judges 4:3", text: "Then the people of Israel cried out to the LORD for help, for he had 900 chariots of iron and he oppressed the people of Israel cruelly for twenty years." }
      ]
    },
    21: {
      significance: "Exceeding sinfulness of sin",
      scriptures: [
        { reference: "Daniel 10:13", text: "The prince of the kingdom of Persia withstood me twenty-one days, but Michael, one of the chief princes, came to help me, for I was left there with the kings of Persia." },
        { reference: "2 Samuel 10:6", text: "When the Ammonites saw that they had become a stench to David, the Ammonites sent and hired the Syrians of Beth-rehob, and the Syrians of Zobah, 20,000 foot soldiers, and the king of Maacah with 1,000 men, and the men of Tob, 12,000 men." }
      ]
    },
    22: {
      significance: "Light, revelation, and disorder turned to order",
      scriptures: [
        { reference: "1 Kings 10:14", text: "The weight of the gold that Solomon received yearly was 666 talents." },
        { reference: "Revelation 22", text: "The final chapter of the Bible, describing the river of life and the tree of life." },
        { reference: "Numbers 3:39", text: "All the males from a month old and upward who were listed were 22,000." }
      ]
    },
    24: {
      significance: "Priesthood and divine governance",
      scriptures: [
        { reference: "Revelation 4:4", text: "Around the throne were twenty-four thrones, and seated on the thrones were twenty-four elders, clothed in white garments, with golden crowns on their heads." },
        { reference: "1 Chronicles 24:1-19", text: "The twenty-four divisions of priests." }
      ]
    },
    25: {
      significance: "Grace upon grace",
      scriptures: [
        { reference: "Ezekiel 40:13", text: "Then he measured the gate from the roof of the one side room to the roof of the other, a breadth of twenty-five cubits; the openings faced each other." },
        { reference: "Leviticus 25:10", text: "And you shall consecrate the fiftieth year, and proclaim liberty throughout the land to all its inhabitants. It shall be a jubilee for you, when each of you shall return to his property and each of you shall return to his clan." }
      ]
    },
    30: {
      significance: "Dedication to leadership or divine service",
      scriptures: [
        { reference: "Luke 3:23", text: "Now Jesus himself was about thirty years old when he began his ministry." },
        { reference: "Numbers 4:3", text: "Count all the men from thirty to fifty years of age who come to serve in the work at the tent of meeting." },
        { reference: "Matthew 26:15", text: "And said, 'What will you give me if I deliver him over to you?' And they paid him thirty pieces of silver." },
        { reference: "Zechariah 11:12", text: "Then I said to them, 'If it seems good to you, give me my wages; but if not, keep them.' And they weighed out as my wages thirty pieces of silver." }
      ]
    },
    33: {
      significance: "Promise and the duration of Jesus' life",
      scriptures: [
        { reference: "John 8:57", text: "So the Jews said to him, 'You are not yet fifty years old, and have you seen Abraham?'" },
        { reference: "Deuteronomy 3:11", text: "For only Og the king of Bashan was left of the remnant of the Rephaim. Behold, his bed was a bed of iron. Is it not in Rabbah of the Ammonites? Nine cubits was its length, and four cubits its breadth, according to the common cubit." }
      ]
    },
    40: {
      significance: "Testing, trial, and preparation",
      scriptures: [
        { reference: "Genesis 7:4", text: "For after seven more days I will cause it to rain on the earth forty days and forty nights, and I will destroy from the face of the earth all living things that I have made." },
        { reference: "Matthew 4:2", text: "And when He had fasted forty days and forty nights, afterward He was hungry." },
        { reference: "Exodus 24:18", text: "Moses entered the cloud and went up on the mountain. And Moses was on the mountain forty days and forty nights." },
        { reference: "Numbers 14:33", text: "And your children shall be shepherds in the wilderness forty years and shall suffer for your faithlessness, until the last of your dead bodies lies in the wilderness." },
        { reference: "1 Kings 19:8", text: "And he arose and ate and drank, and went in the strength of that food forty days and forty nights to Horeb, the mount of God." }
      ]
    },
    42: {
      significance: "Tribulation and judgment",
      scriptures: [
        { reference: "Revelation 13:5", text: "And the beast was given a mouth uttering haughty and blasphemous words, and it was allowed to exercise authority for forty-two months." },
        { reference: "2 Kings 2:24", text: "And he turned around, and when he saw them, he cursed them in the name of the LORD. And two she-bears came out of the woods and tore forty-two of the boys." }
      ]
    },
    50: {
      significance: "Jubilee, freedom, and deliverance",
      scriptures: [
        { reference: "Leviticus 25:10", text: "Consecrate the fiftieth year and proclaim liberty throughout the land to all its inhabitants. It shall be a jubilee for you." },
        { reference: "Acts 2:1-4", text: "When the day of Pentecost came, they were all together in one place... All of them were filled with the Holy Spirit." },
        { reference: "Leviticus 23:16", text: "You shall count fifty days to the day after the seventh Sabbath. Then you shall present a grain offering of new grain to the LORD." },
        { reference: "Genesis 18:24", text: "Suppose there are fifty righteous within the city. Will you then sweep away the place and not spare it for the fifty righteous who are in it?" }
      ]
    },
    70: {
      significance: "Human leadership and judgment",
      scriptures: [
        { reference: "Exodus 24:1", text: "Now He said to Moses, 'Come up to the LORD, you and Aaron, Nadab and Abihu, and seventy of the elders of Israel, and worship from afar.'" },
        { reference: "Luke 10:1", text: "After these things the Lord appointed seventy others also, and sent them two by two before His face into every city and place where He Himself was about to go." },
        { reference: "Genesis 46:27", text: "And the sons of Joseph who were born to him in Egypt were two. All the persons of the house of Jacob who came into Egypt were seventy." },
        { reference: "Jeremiah 25:11", text: "This whole land shall become a ruin and a waste, and these nations shall serve the king of Babylon seventy years." },
        { reference: "Daniel 9:24", text: "Seventy weeks are decreed about your people and your holy city, to finish the transgression, to put an end to sin, and to atone for iniquity, to bring in everlasting righteousness, to seal both vision and prophet, and to anoint a most holy place." }
      ]
    },
    77: {
      significance: "Forgiveness and vengeance",
      scriptures: [
        { reference: "Genesis 4:24", text: "If Cain's revenge is sevenfold, then Lamech's is seventy-sevenfold." },
        { reference: "Matthew 18:22", text: "Jesus said to him, 'I do not say to you seven times, but seventy-seven times.'" }
      ]
    },
    99: {
      significance: "Judgment and completion",
      scriptures: [
        { reference: "Genesis 17:1", text: "When Abram was ninety-nine years old the LORD appeared to Abram and said to him, 'I am God Almighty; walk before me, and be blameless.'" },
        { reference: "Luke 15:4", text: "What man of you, having a hundred sheep, if he has lost one of them, does not leave the ninety-nine in the open country, and go after the one that is lost, until he finds it?" }
      ]
    },
    100: {
      significance: "Fullness and completion of a period",
      scriptures: [
        { reference: "Genesis 21:5", text: "Abraham was a hundred years old when his son Isaac was born to him." },
        { reference: "Matthew 13:8", text: "Still other seed fell on good soil, where it produced a crop—a hundred, sixty or thirty times what was sown." },
        { reference: "Matthew 18:12", text: "What do you think? If a man has a hundred sheep, and one of them has gone astray, does he not leave the ninety-nine on the mountains and go in search of the one that went astray?" },
        { reference: "Luke 16:6", text: "He said, 'A hundred measures of oil.' He said to him, 'Take your bill, and sit down quickly and write fifty.'" }
      ]
    },
    120: {
      significance: "Divine period of probation",
      scriptures: [
        { reference: "Genesis 6:3", text: "Then the LORD said, 'My Spirit shall not abide in man forever, for he is flesh: his days shall be 120 years.'" },
        { reference: "Deuteronomy 34:7", text: "Moses was 120 years old when he died. His eye was undimmed, and his vigor unabated." }
      ]
    },
    144: {
      significance: "The sealed remnant of God",
      scriptures: [
        { reference: "Revelation 7:4", text: "Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel." },
        { reference: "Revelation 21:17", text: "The angel measured the wall using human measurement, and it was 144 cubits thick." },
        { reference: "Revelation 14:1", text: "Then I looked, and behold, on Mount Zion stood the Lamb, and with him 144,000 who had his name and his Father's name written on their foreheads." },
        { reference: "Revelation 14:3", text: "And they were singing a new song before the throne and before the four living creatures and before the elders. No one could learn that song except the 144,000 who had been redeemed from the earth." }
      ]
    },
    153: {
      significance: "The church and evangelism",
      scriptures: [
        { reference: "John 21:11", text: "So Simon Peter went aboard and hauled the net ashore, full of large fish, 153 of them. And although there were so many, the net was not torn." }
      ]
    },
    200: {
      significance: "Insufficiency and inadequacy",
      scriptures: [
        { reference: "John 6:7", text: "Philip answered him, 'Two hundred denarii worth of bread would not be enough for each of them to get a little.'" },
        { reference: "2 Samuel 14:26", text: "And when he cut the hair of his head (for at the end of every year he used to cut it; when it was heavy on him, he cut it), he weighed the hair of his head, two hundred shekels by the king's weight." }
      ]
    },
    300: {
      significance: "Divine deliverance and victory",
      scriptures: [
        { reference: "Judges 7:7-8", text: "And the LORD said to Gideon, 'With the 300 men who lapped I will save you and give the Midianites into your hand, and let all the others go every man to his home.' So the people took provisions in their hands, and their trumpets. And he sent all the rest of Israel every man to his tent, but retained the 300 men." },
        { reference: "Genesis 5:22", text: "Enoch walked with God after he fathered Methuselah 300 years and had other sons and daughters." }
      ]
    },
    390: {
      significance: "Separate kingdoms of Israel",
      scriptures: [
        { reference: "Ezekiel 4:5", text: "For I assign to you a number of days, 390 days, equal to the number of the years of their punishment. So long shall you bear the punishment of the house of Israel." }
      ]
    },
    400: {
      significance: "Divine period of trial",
      scriptures: [
        { reference: "Genesis 15:13", text: "Then the LORD said to Abram, 'Know for certain that your offspring will be sojourners in a land that is not theirs and will be servants there, and they will be afflicted for four hundred years.'" },
        { reference: "Acts 7:6", text: "And God spoke to this effect—that his offspring would be sojourners in a land belonging to others, who would enslave them and afflict them four hundred years." }
      ]
    },
    430: {
      significance: "Bondage and redemption",
      scriptures: [
        { reference: "Exodus 12:40-41", text: "The time that the people of Israel lived in Egypt was 430 years. At the end of 430 years, on that very day, all the hosts of the LORD went out from the land of Egypt." },
        { reference: "Galatians 3:17", text: "This is what I mean: the law, which came 430 years afterward, does not annul a covenant previously ratified by God, so as to make the promise void." }
      ]
    },
    490: {
      significance: "Forgiveness and redemption",
      scriptures: [
        { reference: "Daniel 9:24-27", text: "Seventy weeks are decreed about your people and your holy city..." }
      ]
    },
    666: {
      significance: "Ultimate human imperfection and the Antichrist",
      scriptures: [
        { reference: "Revelation 13:18", text: "This calls for wisdom. Let the person who has insight calculate the number of the beast, for it is the number of a man. That number is 666." },
        { reference: "1 Kings 10:14", text: "The weight of the gold that Solomon received yearly was 666 talents." },
        { reference: "Ezra 2:13", text: "The sons of Adonikam, 666." }
      ]
    },
    777: {
      significance: "Divine completion and perfection",
      scriptures: [
        { reference: "Genesis 5:31", text: "Altogether, Lamech lived a total of 777 years, and then he died." }
      ]
    },
    1000: {
      significance: "Divine completeness and glory of God's kingdom",
      scriptures: [
        { reference: "Revelation 20:2-7", text: "He seized the dragon, that ancient serpent, who is the devil and Satan, and bound him for a thousand years... They came to life and reigned with Christ for a thousand years... When the thousand years are ended, Satan will be released from his prison." },
        { reference: "Psalm 90:4", text: "For a thousand years in your sight are but as yesterday when it is past, or as a watch in the night." }
      ]
    },
    144000: {
      significance: "Complete number of God's sealed servants",
      scriptures: [
        { reference: "Revelation 7:4", text: "Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel." },
        { reference: "Revelation 14:1", text: "Then I looked, and behold, on Mount Zion stood the Lamb, and with him 144,000 who had his name and his Father's name written on their foreheads." }
      ]
    }
  };

  // Function to search for a number
  const searchForNumber = async () => {
    setLoading(true);
    setError("");
    setResults(null);
    
    // Validate input is a number
    const num = parseInt(searchNumber.trim());
    if (isNaN(num)) {
      setError("Please enter a valid number");
      setLoading(false);
      return;
    }
    
    // Check if number exists in database
    if (numberDatabase[num]) {
      setResults({
        number: num,
        ...numberDatabase[num]
      });
    } else {
      // For numbers not in the database, we would ideally search the Bible
      // For now, we'll just show a message about the number not being in our database
      setResults({
        number: num,
        significance: "This number doesn't have a predefined significance in our database.",
        scriptures: [],
        notFound: true
      });
    }
    
    setLoading(false);
  };

  // Function to handle Bible API integration (future enhancement)
  const searchBibleForNumber = async (number) => {
    // This would be implemented with a real Bible API
    // For example, using the ESV API (https://api.esv.org/) or Bible.API (https://scripture.api.bible/)
    console.log(`Searching Bible for occurrences of number ${number}`);
    // Return placeholder for now
    return [];
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-4">Biblical Number Significance</h1>
      <p className="mb-4 text-gray-700 text-center">
        Enter a number to discover its biblical significance and related scriptures.
      </p>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          placeholder="Enter a number..."
          className="flex-grow p-2 border border-gray-300 rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && searchForNumber()}
        />
        <button 
          onClick={searchForNumber}
          className="bg-blue-600 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Translation:
        </label>
        <select
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="ESV">English Standard Version (ESV)</option>
          <option value="KJV">King James Version (KJV)</option>
          <option value="NIV">New International Version (NIV)</option>
          <option value="NASB">New American Standard Bible (NASB)</option>
          <option value="NLT">New Living Translation (NLT)</option>
        </select>
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {loading && <div className="text-center">Loading...</div>}
      
      {results && (
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Number {results.number}</h2>
          
          <div className="mb-4">
            <h3 className="font-medium">Significance:</h3>
            <p className="text-gray-700">{results.significance}</p>
          </div>
          
          {results.scriptures.length > 0 ? (
            <div>
              <h3 className="font-medium mb-2">Related Scriptures:</h3>
              <ul className="space-y-2">
                {results.scriptures.map((scripture, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="font-medium">{scripture.reference}</div>
                    <div className="text-gray-700 italic">{scripture.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.notFound ? (
            <div className="text-gray-700">
              <p>While this number isn't in our predefined database, you might consider:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Looking for direct occurrences of this number in scripture</li>
                <li>Examining the number's factors or mathematical properties</li>
                <li>Studying historical contexts where this number appears</li>
              </ul>
            </div>
          ) : null}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2 font-medium">About Biblical Numerology:</p>
        <p>
          Numbers in the Bible often carry symbolic meaning beyond their mathematical value. 
          The study of these patterns is called biblical numerology. While interesting, 
          interpretation should always be grounded in sound scriptural context rather than 
          mystical significance alone.
        </p>
        <p className="mt-2">
          <strong>Note:</strong> This tool currently uses a predefined database of biblical numbers and their significance.
          In the future, we plan to integrate with a Bible API to provide more comprehensive scripture references.
        </p>
      </div>
    </div>
  );
}
export default App;
