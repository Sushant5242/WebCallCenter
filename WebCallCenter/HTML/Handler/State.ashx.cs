﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Web.SessionState;

namespace WebCallCenter.HTML.Handler
{
    /// <summary>
    /// Summary description for State
    /// </summary>
    public class State : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string DBConnectionstring = Convert.ToString(System.Configuration.ConfigurationManager.ConnectionStrings["ConnString"]);
                int eventid = Convert.ToInt32(context.Request.QueryString["eventid"]);
                SqlConnection sqlConnection = new SqlConnection(DBConnectionstring);
                SqlCommand sqlCommand = new SqlCommand();

                string sJsonData = string.Empty;
                SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCommand);
                DataSet ds = new DataSet();
                string UserId = string.Empty;
                string tUrl = context.Request.QueryString["../../Forms/Login/Login.html"];
                string uResponse = string.Empty;
                UserId = Convert.ToString(HttpContext.Current.Session["UserName"]);


                DataSet EventResultDataSet = new DataSet();
                string State_Id = Convert.ToString(context.Request.Form["State_Id"]);
                string State_Name = Convert.ToString(context.Request.Form["State"]);
                string Flag = Convert.ToString(context.Request.Form["Flag"]);
                string Country_Id = Convert.ToString(context.Request.Form["Country_Id"]);


                switch (eventid)
                {
                    case 1000:
                        sqlCommand.Parameters.Clear();
                        sqlCommand.Connection = sqlConnection;
                        sqlCommand.CommandText = "InsertState";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("State_Id", State_Id);
                        sqlCommand.Parameters.AddWithValue("State_Name", State_Name);
                        sqlCommand.Parameters.AddWithValue("Country_Id", Country_Id);
                        sqlCommand.Parameters.AddWithValue("UserId", UserId);
                        sqlCommand.Parameters.AddWithValue("Flag", Flag);
                        sqlAdapter.Fill(ds);
                        sJsonData = JsonConvert.SerializeObject(ds);
                        context.Response.Write(sJsonData);
                        break;
                }
            }
            catch (Exception ex)
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}