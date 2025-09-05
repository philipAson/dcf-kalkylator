const ToolTipTexts = {
    // DCF-kalkylator disclaimer
    dcfDisclaimer:"Beräkningarna tar inte hänsyn till oförutsedda marknadshändelser och reflekterar endast de uppgifter som lagts in i modellen.",
    // DCF-kalkylator beskrivning
    dcfHeader:"Vår DCF-kalkylator hjälper dig att beräkna det fundamentala värdet av en aktie baserat på framtida kassaflöden och risken i dessa kassaflöden. Du kan justera en rad parametrar nedan för att se hur det påverkar det fundamental värdet på aktien.",
    // Dagens aktiepris
    stockPrice: "Här fyller du i hur mycket den nuvarande aktiekursen är, alltså priset för en aktie idag. Den potentiella värdeökningen i en aktie är skillnaden mellan dagens aktiepris och det underliggande värdet på bolaget fördelat på antalet aktier. Dagens aktiepris är därför högst centralt för att beräkna den potentiella uppsidan i en aktie.",
    // P/E-tal
    PEratio: "P/E är en förkortning för ”Price/Earnings” och visar priset per aktie i relation till bolagets vinst per aktie. P/E 10 betyder således att bolaget värderas till 10 gånger vinsten. För att beräkna P/E-talet så dividera priset per aktie med företagets vinst per aktie.\n\nNotera: Modellen använder P/E-talet som en proximation för P/FCF (FCF=fritt kassaflöde) eftersom P/E-talet är enklare att beräkna, är mer tillgängligt och att E (earnings) fluktuerar mindre än FCF (fritt kassaflöde) över tid",
    // Årlig tillväxttakt
    growthRate: "Här fyller du i hur många procent per år som du förväntar dig att företaget kommer växa sin vinst innan bolaget når sitt mogna stadie och växer ungefär i takt med BNP.",
    // Period tills moget stadie
    growthPeriod: "Här fyller du i hur många år du tror att bolaget kommer behålla den vinsttillväxt du angav ovan innan företaget når sitt mogna stadie. Unga bolag kan ofta behålla en hög tillväxttakt under en längre period än större bolag. Förr eller senare når alla företag ett moget stadie och växer i takt med BNP, annars hade bolaget teoretiskt på sikt växt sig större än globalt BNP.",
    // Diskonteringsränta
    discountRate: "Här fyller du i den diskonteringsränta som företagets framtida kassaflöden diskonteras med. Eftersom kassaflöden som förväntas komma längre fram i tiden i högre utsträckning är utsatta för inflation och marknadsrisk så diskonteras de med denna ränta. Diskonteringsräntan är alltså den avkastning som investerare kräver för att förvalta sitt kapital i företaget i kompensation för risken som de tar.\n\nSom referens brukar diskonteringsräntan, eller avkastningskravet, vara i spannet 8-15% där mogna bolag med beprövade affärsmodeller tenderar att ha ett avkastningskrav i den lägre delen av intervallet och snabbväxande bolag med mer oprövade affärsmodeller tenderar att ha ett avkastningskrav i den högre delen av intervallet.",
    // Fundamentalt aktievärde
    fairValue: "Det fundamentala aktievärdet är summan av alla framtida diskonterade kassaflöden per aktie som företaget förväntas generera enligt dina antagande som du har lagt in i modellen. Teoretiskt sett så ska dagens aktiepris reflektera detta fundamentala värde Ifall dagens pris är lägre så indikerar det att det finns uppsida i aktien. Notera att detta fundamentala aktievärde endast reflekterar dina egna antaganden som du har lagt in i modellen.",
};

export default ToolTipTexts;