const assert = require('assert');
const qg = require('../utils/queryGenerator');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('queryGenerator.upgrade()', function() {

  it('empty query', function() {
    assert.equal(qg.upgrade({}).queryString, 'SELECT data  FROM upgrade  WHERE 1=1 ;');
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'name') ilike $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'name') ilike $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'name') ilike $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data -> 'type') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data -> 'type') ? $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data -> 'type') ? $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'points')::int != $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int = $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int < $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int <= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int > $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int >= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'points')::int != $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'points')::int != $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data -> 'restrictions') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data -> 'restrictions') ? $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data -> 'restrictions') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data -> 'wave') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data -> 'wave') ? $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data -> 'wave') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'text') ilike $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'text') ilike $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'text') ilike $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'dice')::int != $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int = $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int < $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int <= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int > $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int >= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'dice')::int != $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'dice')::int != $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'range') ilike $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'range') ilike $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'range') ilike $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data -> 'deploy') ? $1 ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data -> 'deploy') ? $1      ) ;");
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
      }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data -> 'deploy') ? $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'energycapacity')::int != $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int = $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int < $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int <= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int > $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int >= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'energycapacity')::int != $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'energycapacity')::int != $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (data ->> 'perattack')::int != $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int = $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int < $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int <= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int > $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int >= $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND (       (data ->> 'perattack')::int != $1      ) ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int = $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int < $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int <= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int > $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int >= $1 ;");
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
        }).queryString, "SELECT data  FROM upgrade  WHERE 1=1      AND NOT (data ->> 'perattack')::int != $1 ;");
      });
    });
  });




});