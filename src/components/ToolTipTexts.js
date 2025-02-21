const ToolTipTexts = {
    // Dagens aktiepris
    stockPrice: "Här fyller du i hur mycket den nuvarande aktiekursen är, alltså priset för en aktie idag. Den potentiella värdeökningen i en aktie är skillnaden mellan dagens aktievärde och dess fundamentala aktievärdet. Dagens aktiepris är därför högst centralt för att beräkna uppsidan i en aktie.",
    // P/E-tal
    PEratio: "P/E är en förkortning för price/earnings och är ett vanligt förekommande mått på börsvärdet på ett bolag i förhållande till dess vinst. Bolag som anses mer attraktiva t.ex att de har en stark marknadsposition, förväntas växa mycket i framtiden eller är väldigt lönsamma tenderar att värderas med ett högre P/E-tal. För att beräkna P/E-talet så dividerar börsvärdet (market capitalization) med företagets vinst. Notera: I den här modellen används P/E för att ge en indikation på bolagets marknadsvärde i förhållande till dess kassaflöde (vinst med ett antal justeringar). Detta är lite av en förenkling då det är bolagets kassaflöde och inte vinst som egentiligen används för att beräkna bolagets fundamentala värde.",
    // Årlig tillväxttakt
    growthRate: "Här fyller du i hur många procent per år som du förväntar dig att företaget kommer växa sin omsättning innan bolaget når sitt mogna stadie och växer ungefär i takt med BNP.",
    // Period tills moget stadie
    growthPeriod: "Här fyller du i hur många år du tror att bolaget kommer behålla den omsättningstillväxt du angav ovan innan det når sitt mogna stadie. Unga bolag kan ofta behålla hög tillväxttakt under en längre period än större bolag. Förr eller senare når alla bolag sitt mogna stadie och växer i takt med BNP, annars hade bolaget teoretiskt sett blivit större än hela sitt land och till slut hela världen.",
    // Diskonteringsränta
    discountRate: "Här fyller du i den diskonteringsränta som företagets framtida kassaflöden borde diskonteras med. Diskonteringsränta används för att ta hänsyn till att vinst och i sin tur kassaflöde är mer värdefullt ju närmare i tiden det förväntas komma. Ju längre bort i tiden, desto mer osäkerhet finns det gällande inflation, operationell risk och marknadsrisk. Diskonteringsränta är alltså den avkastning som investerare kräver i kompensation för risken att ha sitt kapital i bolaget. Mer riskabla företag ska alltså ha högre diskonteringsränta än stabila företag. Som referens så brukar denna ränta ligga i spannet från 8% till 18%.",
    // Fundamentalt aktievärde
    fairValue: "Fundamentalt aktievärde är det pris per aktie som marknaden teoretiskt borde prissätta aktien till givet den framtida utveckling som du har lagt in i modellen. Ifall det finns uppsida innebär det att aktien borde handlas till ett högre pris givet dess underliggande värde och att det kan finnas pengar att tjäna. Notera att detta värde endast reflekterar dina egna antagande och att den faktiska prissättningen kan bygga på en helt andra antagande.",
};

export default ToolTipTexts;