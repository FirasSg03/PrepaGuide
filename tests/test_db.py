import sqlite3, pytest
from app.db import get_db

# tests get_db for return the same connection each time its called and
# closing connection after context
def test_get_close_db(app):
    with app.app_context():
        db = get_db()
        assert db is get_db()

    with pytest.raises(sqlite3.ProgrammingError) as e:
        db.execute('SELECT 1')

    assert 'closed' in str(e.value)
    
"""   
This test uses Pytest’s monkeypatch fixture to replace the 
init_db function with one that records that 
it’s been called. The runner fixture you wrote above is used 
to call the init-db command by name.
"""
def test_init_db_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_init_db():
        Recorder.called = True

    monkeypatch.setattr('app.db.init_db', fake_init_db)
    result = runner.invoke(args=['init-db'])
    assert 'Initialized' in result.output
    assert Recorder.called