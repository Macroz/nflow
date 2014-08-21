package com.nitorcreations.nflow.engine.internal.storage.db;

import static org.joda.time.DateTimeUtils.currentTimeMillis;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.h2.tools.TriggerAdapter;

public class H2ModifiedColumnTrigger extends TriggerAdapter {
  @Override
  public void fire(Connection conn, ResultSet oldRow, ResultSet newRow) throws SQLException {
    newRow.updateTimestamp("modified", new Timestamp(currentTimeMillis()));
  }
}