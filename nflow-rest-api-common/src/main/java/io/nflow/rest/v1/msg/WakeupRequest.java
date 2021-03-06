package io.nflow.rest.v1.msg;

import java.util.List;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import io.nflow.engine.model.ModelObject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import static java.util.Collections.emptyList;

@ApiModel(description = "Request to wake up a sleeping workflow instance matching the given id if it is in one of the expected states.")
@SuppressFBWarnings(value = "URF_UNREAD_PUBLIC_OR_PROTECTED_FIELD", justification = "jackson reads dto fields")
public class WakeupRequest extends ModelObject {

  @ApiModelProperty("List of expected states. Can be empty, meaning any state.")
  public List<String> expectedStates = emptyList();

}
