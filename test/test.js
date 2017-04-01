const assert = require('assert');
const qg = require('../middleware/queryGenerator');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('queryGenerator.upgrade()', function() {

  it('empty query', function() {
    assert.equal(qg.upgrade({}).querystring, 'SELECT data  FROM upgrades  WHERE 1=1  LIMIT 25;');
  });

  describe('#name', function() {
      it('AND', function () {
      assert.equal(qg.upgrade({
        "name": {
          "&": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'name') ilike $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "name": {
          "|": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'name') ilike $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "name": {
          "!": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'name') ilike $1  LIMIT 25;");
    });
  });

  describe('#type', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "type": {
          "&": [
            {
              "val": "Astromech"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data -> 'type') ? $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "type": {
          "|": [
            {
              "val": "Astromech"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data -> 'type') ? $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "type": {
          "!": [
            {
              "val": "Astromech"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data -> 'type') ? $1  LIMIT 25;");
    });
  });

  describe('#points', function() {
    describe('AND', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "&": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'points')::int != $1  LIMIT 25;");
      });
    });
    describe('OR', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int = $1      )  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int < $1      )  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int <= $1      )  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int > $1      )  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int >= $1      )  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "|": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'points')::int != $1      )  LIMIT 25;");
      });
    });
    describe('NOT', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "points": {
            "!": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'points')::int != $1  LIMIT 25;");
      });
    });
  });

  describe('#restrictions', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "restrictions": {
          "&": [
            {
              "val": "A-Wing only."
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data -> 'restrictions') ? $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "restrictions": {
          "|": [
            {
              "val": "A-Wing only."
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data -> 'restrictions') ? $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "restrictions": {
          "!": [
            {
              "val": "A-Wing only."
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data -> 'restrictions') ? $1  LIMIT 25;");
    });
  });

  describe('#wave', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "wave": {
          "&": [
            {
              "val": "C-ROC Cruiser"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data -> 'wave') ? $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "wave": {
          "|": [
            {
              "val": "C-ROC Cruiser"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data -> 'wave') ? $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "wave": {
          "!": [
            {
              "val": "C-ROC Cruiser"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data -> 'wave') ? $1  LIMIT 25;");
    });
  });

  describe('#text', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "text": {
          "&": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'text') ilike $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "text": {
          "|": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'text') ilike $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "text": {
          "!": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'text') ilike $1  LIMIT 25;");
    });
  });

  describe('#dice', function() {
    describe('AND', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "&": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'dice')::int != $1  LIMIT 25;");
      });
    });
    describe('OR', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int = $1      )  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int < $1      )  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int <= $1      )  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int > $1      )  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int >= $1      )  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "|": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'dice')::int != $1      )  LIMIT 25;");
      });
    });
    describe('NOT', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "dice": {
            "!": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'dice')::int != $1  LIMIT 25;");
      });
    });
  });

  describe('#range', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "range": {
          "&": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'range') ilike $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "range": {
          "|": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'range') ilike $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "range": {
          "!": [
            {
              "val": "bossk"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'range') ilike $1  LIMIT 25;");
    });
  });

  describe('#deploy', function() {
    it('AND', function () {
      assert.equal(qg.upgrade({
        "deploy": {
          "&": [
            {
              "val": "Action"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data -> 'deploy') ? $1  LIMIT 25;");
    });
    it('OR', function () {
      assert.equal(qg.upgrade({
        "deploy": {
          "|": [
            {
              "val": "Action"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data -> 'deploy') ? $1      )  LIMIT 25;");
    });
    it('NOT', function () {
      assert.equal(qg.upgrade({
        "deploy": {
          "!": [
            {
              "val": "Action"
            }
          ]
        }
      }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data -> 'deploy') ? $1  LIMIT 25;");
    });
  });

  describe('#energycapacity', function() {
    describe('AND', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "&": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'energycapacity')::int != $1  LIMIT 25;");
      });
    });
    describe('OR', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int = $1      )  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int < $1      )  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int <= $1      )  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int > $1      )  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int >= $1      )  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "|": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'energycapacity')::int != $1      )  LIMIT 25;");
      });
    });
    describe('NOT', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "energycapacity": {
            "!": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int != $1  LIMIT 25;");
      });
    });
  });

  describe('#perattack', function() {
    describe('AND', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "&": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (data ->> 'perattack')::int != $1  LIMIT 25;");
      });
    });
    describe('OR', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int = $1      )  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int < $1      )  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int <= $1      )  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int > $1      )  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int >= $1      )  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "|": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND (       (data ->> 'perattack')::int != $1      )  LIMIT 25;");
      });
    });
    describe('NOT', function() {
      it('=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": "="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int = $1  LIMIT 25;");
      });
      it('<', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": "<"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int < $1  LIMIT 25;");
      });
      it('<=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": "<="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int <= $1  LIMIT 25;");
      });
      it('>', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": ">"
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int > $1  LIMIT 25;");
      });
      it('>=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": ">="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int >= $1  LIMIT 25;");
      });
      it('!=', function () {
        assert.equal(qg.upgrade({
          "perattack": {
            "!": [
              {
                "val": "1",
                "op": "!="
              }
            ]
          }
        }).querystring, "SELECT data  FROM upgrades  WHERE 1=1      AND NOT (data ->> 'perattack')::int != $1  LIMIT 25;");
      });
    });
  });




});