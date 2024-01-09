import { CapitalizeFirstLetterInSentence } from "../Utils/Utils";

function ChooseColorForStatBar(value) {
  if (value < 50) return "#FA5858";
  else if (value >= 50 && value < 75) return "#FAAC58";
  else if (value >= 75 && value < 100) return "#F4FA58";
  else if (value >= 100 && value < 125) return "#82FA58";
  else if (value >= 125) return "#B7FBFF";
}

function ChooseColorForTotalStatBar(value) {
  if (value < 300) return "#FA5858";
  else if (value >= 300 && value < 400) return "#FAAC58";
  else if (value >= 400 && value < 500) return "#F4FA58";
  else if (value >= 500 && value < 600) return "#82FA58";
  else if (value >= 600) return "#B7FBFF";
}

const PokemonTableStats = ({ info }) => {
  return (
    <div className="pokemonStats">
      <h2>Stats</h2>

      <table className="statsTable">
        <thead>
          <tr>
            <th style={{ width: "8rem" }}>Stat</th>
            <th>Value</th>
            <th style={{ width: "3rem" }}>EV</th>
          </tr>
        </thead>
        <tbody>
          {info[0].stats.map((stat) => (
            <tr key={stat.stat.name}>
              <td>
                <b>
                  {CapitalizeFirstLetterInSentence(
                    stat.stat.name.replace("-", " ")
                  )}
                </b>
              </td>
              <td>
                <div className="valueCell">
                  <span style={{ width: "2rem" }}>{stat.base_stat}</span>
                  <div
                    style={{
                      backgroundColor: ChooseColorForStatBar(stat.base_stat),
                      width: `calc(100% * ${stat.base_stat}/257)`,
                      borderRadius: "5px",
                      height: "15px",
                      marginLeft: "2%",
                    }}
                  ></div>
                </div>
              </td>
              <td>{stat.effort}</td>
            </tr>
          ))}
          <tr key={"total"}>
            <td>
              <b>Total</b>
            </td>
            <td>
              <div className="valueCell">
                <span style={{ width: "2rem" }}>
                  {info[0].stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </span>
                <div
                  style={{
                    backgroundColor: ChooseColorForTotalStatBar(
                      info[0].stats.reduce(
                        (sum, stat) => sum + stat.base_stat,
                        0
                      )
                    ),
                    width: `calc(100% * ${info[0].stats.reduce(
                      (sum, stat) => sum + stat.base_stat,
                      0
                    )}/1150)`,
                    borderRadius: "5px",
                    height: "15px",
                    marginLeft: "2%",
                  }}
                ></div>
              </div>
            </td>
            <td>{info[0].stats.reduce((sum, stat) => sum + stat.effort, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTableStats;
