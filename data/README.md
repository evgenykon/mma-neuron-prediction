## Data collection README

### Parsing data with `export/meta.json` config

`meta.json` is a array of objects, where each item is related to file with data, and defines how that file can be parsed.

```json
[
    {
        "type": "FIGHTERS",
        "path": "./data/export/csv/some_mma_fighters_data.csv",
        "format": "CSV",
        "separator": ",",
        "structure": [
            {"name": "fighter_name"}, {"age":"age"}, {"country":"country"}, {"height":"height"}, 
            {"team": "association"}, {"wins": "wins"}, {"winsKo": "wins_ko"}, 
            {"winsSub": "wins_submission"}, {"winsDec":"wins_decision"}, {"losses": "lossess"},
            {"lossKo": "losses_ko"}, {"lossSub": "losses_submission"}, {"lossDec": "losses_decision"}
        ]
    },
    {
        "type": "FIGHTERS",
        "path": "./data/export/json/some_mma_fighters_data.json",
        "format": "JSON",
        "structure": [
            {"name": "name"}, {"wins": "wins"}, {"losses": "losses"}, {"height": "height"}, {"reach": "reach"},
            {"stance": "stance"}, {"tdDef": "tddef"}, {"tdAccur": "tdacc"}, {"tdPerMin": "tdavg"}, {"ssDef": "strdef"}, {"ssAccur":"stracc"},
            {"ssHitPerMin": "slpm"}, {"ssLostPerMin":"sapm"}
        ]
    },
    {
        "type": "FIGHTS",
        "path": "./data/export/csv/some_mma_fights_data.csv",
        "format": "CSV",
        "separator": ";",
        "structure": [
            {"f1_name": "R_fighter"}, {"f1_kd": "R_KD"}, {"f1_ss": "R_SIG_STR"}, {"f1_ssPct": "R_SIG_STR_pct"},
            {"f1_ts": "R_TOTAL_STR"}, {"f1_td": "R_TD"}, {"f1_tdPct": "R_TD_pct"}, {"f1_subAtt": "R_SUB_ATT"},
            {"f1_head": "R_HEAD"}, {"f1_body": "R_BODY"}, {"f1_leg": "R_LEG"},
            {"f2_name": "B_fighter"}, {"f2_kd": "B_KD"}, {"f2_ss": "B_SIG_STR"}, {"f2_ssPct": "B_SIG_STR_pct"},
            {"f2_ts": "B_TOTAL_STR"}, {"f2_td": "B_TD"}, {"f2_tdPct": "B_TD_pct"}, {"f2_subAtt": "B_SUB_ATT"},
            {"f2_head": "B_HEAD"}, {"f2_body": "B_BODY"}, {"f2_leg": "B_LEG"},
            {"format": "Format"}, {"winner": "Winner"}, {"winBy": "win_by"}, {"lastRound": "last_round"},
            {"lastRoundTime":"last_round_time"}, {"referree":"Referee"}, {"date": "date"}, {"location": "location"}
        ]
    }
]
```
Config object structure 
| Parameter | Value | Description |
|---|---|---|
| type | One of `FIGHTER` or `FIGHT` | What kind of data that file includes |
| path | `./data/any_file` | Path to file with data |
| format | One of `CSV` or `JSON` | File format |
| separator | `, ;` etc | Field separator (for CSV only) |
| structure | `[{"winsKo": "wins_ko"}]` | array of mapping internal paramater name and file field name |

## Other info

- [Models](MODELS.md)
- [Diagrams](DIAGRAMS.md)