using System;
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
    /// Summary description for Country
    /// </summary>
    public class Country : IHttpHandler, IRequiresSessionState
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
                string Country_Id = Convert.ToString(context.Request.Form["Country_Id"]);
                string Country_Name = Convert.ToString(context.Request.Form["Country"]);
                string Flag = Convert.ToString(context.Request.Form["Flag"]);



                switch (eventid)
                {
                    case 1000:
                        sqlCommand.Parameters.Clear();
                        sqlCommand.Connection = sqlConnection;
                        sqlCommand.CommandText = "InsertCountry";
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.Parameters.AddWithValue("Country_Id", Country_Id);
                        sqlCommand.Parameters.AddWithValue("Country_Name", Country_Name);
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