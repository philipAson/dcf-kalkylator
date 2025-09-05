import DcfInput from "./DcfInput";
import CustomToolTip from "./CustomToolTip";
import ToolTipTexts from "./ToolTipTexts";
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
  const growthRateInPerpetuity = 2.5; // %

  // State for the calculated values
  const [cumulativeDiscounted, setCumulativeDiscounted] = useState([]);

  // --- OUTPUT VALUES ---
  // Fundamentalt aktievärde
  const [intrinsicValue, setIntrinsicValue] = useState(0);
  // Upp eller nersida
  const [marginOfSafety, setMarginOfSafety] = useState(0);
  // Margin of safety formatted for display
  const [marginOfSafetyFormatted, setMarginOfSafetyFormatted] = useState(0);

  // Calculate the cash flow for x years
  useEffect(() => {
    // Kassaflöde
    let cashFlow = [stockPrice / PEratio];
    
    // Nuvärde av kassaflöden
    let presentValueOfCashflow = [];
    // Kumulativt diskonterat kassaflöde (för graf)
    let cumulativeDiscountedValues = [
      {
        "DISKONTERAT KASSAFLÖDE": 0,
        ÅR: 0,
        "DAGENS AKTIEPRIS": stockPrice,
      },
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
        "DISKONTERAT KASSAFLÖDE":
          presentValueOfCashflow[i] +
          cumulativeDiscountedValues[i]["DISKONTERAT KASSAFLÖDE"],
        ÅR: i,
        "DAGENS AKTIEPRIS": stockPrice,
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
        return value.toLocaleString("sv-SE");
      } else {
        const millions = value / 1_000_000;

        const formatted = millions.toLocaleString("sv-SE", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
        return formatted + " M";
      }
    };

    const formatMarginOfSafety = (value) => {
      if (value < 1_000_000) {
        return value.toLocaleString("sv-SE");
      } else {
        const millions = value / 1_000_000;

        const formatted = millions.toLocaleString("sv-SE", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
        return formatted + " M";
      }
    };

    const getMarginOfSafetyColor = (marginOfSafety) => {
      if (marginOfSafety <= 0) {
        return "#E76F51"; // Röd
      } else if (marginOfSafety < 15) {
        return "#152450"; // Neutral(blå)
      } else {
        return "#2B9348"; // Grön
      }
    };

    let marginOfSafetyColor = getMarginOfSafetyColor(marginOfSafety);
    setCumulativeDiscounted(cumulativeDiscountedValues);
    setIntrinsicValue(formatInstrinctValue(fundamentalStockValue));
    setMarginOfSafetyFormatted(formatMarginOfSafety(marginOfSafety));
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

  return (
    <div className="dcf-body">
      <div className="dcf-header">
        <p style={{ lineHeight: 1.68 }}>{ToolTipTexts.dcfHeader}</p>
      </div>
      <div className="dcf-graph">
        <ResponsiveContainer className="responsive-chart">
          <LineChart className="chart" data={cumulativeDiscounted.slice(1)}>
            <Line
              type="monotone"
              dataKey="DISKONTERAT KASSAFLÖDE"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="DAGENS AKTIEPRIS"
              stroke="#F4A261"
              strokeWidth={2}
              dot={false}
            />
            <YAxis
              padding={{ top: 11 }}
              width={55}
              tick={{ fill: "#ffffff" }}
              type={"number"}
              tickMargin={10}
              tickFormatter={(value) =>
                value < 999999
                  ? Math.round(value).toLocaleString()
                  : (value / 1000000).toFixed(2).toLocaleString() + " M"
              }
              fontFamily="bebas-neue-pro"
              fontWeight={400}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "DISKONTERAT KASSAFLÖDE") {
                  return value.toFixed(2);
                } else if (name === "DAGENS AKTIEPRIS") {
                  return value;
                }
              }}
              labelFormatter={(value) => "ÅR: " + (value + 1)}
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
          max={1000}
          step={10}
          toolTip={true}
          toolTipText={ToolTipTexts.stockPrice}
        />
        <DcfInput
          getter={PEratio}
          setter={setPEratio}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="P/E-tal"
          min={1}
          max={75}
          step={1}
          toolTip={true}
          toolTipText={ToolTipTexts.PEratio}
        />
        <DcfInput
          getter={growthRate}
          setter={setGrowthRate}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Årlig vinsttillväxt"
          min={1}
          max={50}
          step={1}
          unit="%"
          toolTip={true}
          toolTipText={ToolTipTexts.growthRate}
        />
        <DcfInput
          getter={growthPeriod}
          setter={setGrowthPeriod}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Period tills moget stadie"
          min={3}
          max={30}
          step={1}
          unit="år"
          toolTip={true}
          toolTipText={ToolTipTexts.growthPeriod}
        />
        <DcfInput
          getter={discountRate}
          setter={setDiscountRate}
          handleSlider={handleSliderChange}
          handleInput={handleInputChange}
          title="Diskonteringsränta"
          min={1}
          max={20}
          step={1}
          unit="%"
          toolTip={true}
          toolTipText={ToolTipTexts.discountRate}
        />
      </div>
      <div className="dcf-calc-result">
        <p className="dcf-result-container">
          <p style={{ margin: 0 }}>UPP/NERSIDA</p>
          <p
            className="dcf-result"
            style={{ backgroundColor: marginOfSafetyColor }}
          >
            {marginOfSafetyFormatted}%
          </p>
        </p>
        <p className="dcf-result-container r">
          <p style={{ margin: 0 }}>
            FUNDAMENTALT AKTIEVÄRDE{" "}
            <CustomToolTip toolTipText={ToolTipTexts.fairValue} />
          </p>
          <p className="dcf-result">{intrinsicValue}</p>
        </p>
      </div>
      <div className="dcf-disclaimer">{ToolTipTexts.dcfDisclaimer}</div>
    </div>
  );
};

export default Dcf;
