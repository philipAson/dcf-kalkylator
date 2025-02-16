import DcfInput from "./DcfInput";
import React, { useState, useEffect } from "react";
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dcf = () => {
  // --- STATE FOR INPUT VALUES ---
  // Aktiepris
  const [stockPrice, setStockPrice] = useState(77);
  // P/E-tal
  const [PEratio, setPEratio] = useState(15.5);
  // Tillväxtperiod
  const [growthPeriod, setGrowthPeriod] = useState(10);
  // Diskonteringsränta
  const [discountRate, setDiscountRate] = useState(11);
  // Tillväxttakt till mognad
  const [growthRate, setGrowthRate] = useState(10);
  // Margin of safety color
  const [marginOfSafetyColor, setMarginOfSafetyColor] = useState("152450");

  // --- ASSUMPTIONS MODEL ---
  // Tillväxttakt i mogna fasen
  const [growthRateInPerpetuity, setGrowthRateInPerpetuity] = useState(2);

  // State for the calculated values
  const [cumulativeDiscounted, setCumulativeDiscounted] = useState([]);

  // --- OUTPUT VALUES ---
  // Fundamentalt aktievärde
  const [intrinsicValue, setIntrinsicValue] = useState(0);
  // Upp eller nersida
  const [marginOfSafety, setMarginOfSafety] = useState(0);

  // Calculate the cash flow for x years
  useEffect(() => {
    // Kassaflöde
    let cashFlow = [stockPrice / PEratio];
    // Nuvärde av kassaflöden
    let presentValueOfCashflow = [];
    // Kumulativt diskonterat kassaflöde (för graf)
    let cumulativeDiscountedValues = [
      { KASSAFLÖDE: cashFlow[0], ÅR: 0, AKTIEPRIS: stockPrice },
    ];

    for (let i = 0; i < growthPeriod + 90; i++) {
      let nextCashFlow;

      if (cashFlow.length < growthPeriod) {
        nextCashFlow = cashFlow[cashFlow.length - 1] * (1 + growthRate / 100);
      } else {
        nextCashFlow =
          cashFlow[cashFlow.length - 1] * (1 + growthRateInPerpetuity / 100);
      }
      cashFlow.push(nextCashFlow);

      presentValueOfCashflow.push(
        nextCashFlow / Math.pow(1 + discountRate / 100, i + 1)
      );

      cumulativeDiscountedValues.push({
        KASSAFLÖDE:
          presentValueOfCashflow[i] + cumulativeDiscountedValues[i].KASSAFLÖDE,
        ÅR: i + 1,
        AKTIEPRIS: stockPrice,
      });
    }
    let fundamentalStockValue = presentValueOfCashflow
      .slice(0)
      .reduce((acc, val) => acc + val, 0)
      .toFixed(1);

    let marginOfSafety = (
      ((fundamentalStockValue - stockPrice) / stockPrice) *
      100
    ).toFixed(1);

    const formatInstrinctValue = (value) => {
      if (value < 1_000_000) {
        // Under 1 miljon → exempelvis 123 456 kr
        return value.toLocaleString("sv-SE") + " kr";
      } else {
        // 1 miljon eller mer → exempelvis 1,23 Mkr
        const millions = value / 1_000_000;
        // Exempelvis 1.234942 => "1,23"
        const formatted = millions.toLocaleString("sv-SE", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
        return formatted + " Mkr";
      }
    };

    const getMarginOfSafetyColor = (marginOfSafety) => {
      if (marginOfSafety <= 0) {
        return "#E76F51"; // Röd
      } else if (marginOfSafety < 15) {
        return "#152450"; // Neutral
      } else {
        return "#2B9348"; // Grön
      }
    };

    let marginOfSafetyColor = getMarginOfSafetyColor(marginOfSafety);
    setCumulativeDiscounted(cumulativeDiscountedValues);
    setIntrinsicValue(formatInstrinctValue(fundamentalStockValue));
    setMarginOfSafety(marginOfSafety);

    setMarginOfSafetyColor(marginOfSafetyColor);
  }, [
    stockPrice,
    PEratio,
    growthPeriod,
    growthRate,
    growthRateInPerpetuity,
    discountRate,
    intrinsicValue,
    marginOfSafety,
    marginOfSafetyColor,
  ]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const longText = `
    Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
    Praesent non nunc mollis, fermentum neque at, semper arcu.
    Nullam eget est sed sem iaculis gravida eget vitae justo.
    `;

  return (
    <div className="dcf-body">
      <div className="dcf-header">
        <p style={{ lineHeight: 1.68 }}>
          Vår DCF-kalkylator hjälper dig att beräkna det uppskattade nuvärdet av
          en investering baserat på framtida kassaflöden. Du kan justera en rad
          olika parametrar nedan för att se hur de påverkar värderingen.
        </p>
      </div>
      <div className="dcf-graph">
        <ResponsiveContainer className="responsive-chart">
          <LineChart className="chart" data={cumulativeDiscounted}>
            <Line
              type="monotone"
              dataKey="KASSAFLÖDE"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="AKTIEPRIS"
              stroke="#F4A261"
              strokeWidth={2}
              dot={false}
            />
            <YAxis
              padding={{ top: 11 }}
              width={90}
              tick={{ fill: "#ffffff" }}
              type={"number"}
              // tickFormatter={(value) =>
              //   value < 999999
              //     ? Math.round(value / 1000).toLocaleString() + " TKR"
              //     : (value / 1000000).toFixed(2).toLocaleString() + " MKR"
              // }
              tickMargin={10}
              fontFamily="bebas-neue-pro"
              fontWeight={400}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "KASSAFLÖDE") {
                  return `${value.toFixed(2)} kr`;
                } else if (name === "AKTIEPRIS") {
                  return `${value} kr`;
                }
              }}
              labelFormatter={(value) => "ÅR: " + value}
              contentStyle={{
                backgroundColor: "#fffffff, 0.8",
                color: "#ffffff",
                border: "none",
                borderRadius: 7,
                textAlign: "left",
                fontFamily: "bebas-neue-pro",
                fontSize: 14,
                fontWeight: 300,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="dcf-input">
        <DcfInput
          getter={stockPrice}
          setter={setStockPrice}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Dagens aktiepris"
          min={10}
          max={300}
          step={10}
          unit="kr"
        />
        <DcfInput
          getter={PEratio}
          setter={setPEratio}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="P/E-tal"
          min={1}
          max={100}
          step={1}
        />
        <DcfInput
          getter={growthRate}
          setter={setGrowthRate}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Årlig tillväxttakt"
          min={1}
          max={100}
          step={1}
          unit="%"
          toolTip={true}
          toolTipText={longText}
        />
        <DcfInput
          getter={growthPeriod}
          setter={setGrowthPeriod}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Period tills moget stadie"
          min={3}
          max={10}
          step={1}
          unit="år"
        />
        <DcfInput
          getter={discountRate}
          setter={setDiscountRate}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Diskonteringsränta"
          min={1}
          max={100}
          step={1}
          unit="%"
          toolTip={true}
          toolTipText={longText}
        />
      </div>
      <div className="calc-result">
        <p className="result-container">
          UPP/NERSIDA <br />
          <p
            className="dcf-result"
            style={{ backgroundColor: marginOfSafetyColor }}
          >
            {marginOfSafety}%
          </p>
        </p>
        <p className="result-container">
          FUNDAMENTALT AKTIEVÄRDE <br />
          <p className="dcf-result">{intrinsicValue}</p>
        </p>
      </div>
      <div className="disclaimer">
        Beräkningarna tar inte hänsyn till oförutsedda marknadshändelser och
        reflekterar endast de uppgifter som lagts in i modellen.
      </div>
    </div>
  );
};

export default Dcf;
